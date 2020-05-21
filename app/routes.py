import os
import sys
import time
import pandas as pd
import numpy as np
from app import app, db
from sqlalchemy.exc import IntegrityError
from app.models import Recipe, Tag, Ingredient, Unit, Category, Recipe_Tag, Recipe_Ingredient, Shopping
from flask import render_template, request, redirect, send_from_directory, session, url_for, jsonify
from functools import wraps
from PIL import Image


@app.before_request
def make_session_permanent():
    session.permanent = True


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return redirect(url_for('index'))


def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            return redirect(url_for('login'))
    return wrap


@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['text'] != app.config['APP_CODE']:
            error = 'Invalid Credentials. Please try again.'
        else:
            session['logged_in'] = True
            return redirect(url_for('index'))
    return render_template('login.html', error=error)


@app.route('/')
@login_required
def index():
    return render_template('build/index.html')


@app.route('/favicon.ico')
def serve_favicon():
    path = os.path.join(app.template_folder, 'build')
    return send_from_directory(path, 'favicon.ico')


@app.route('/manifest.json')
def serve_manifest():
    path = os.path.join(app.template_folder, 'build')
    return send_from_directory(path, 'manifest.json')


@app.route('/logo192.png')
def serve_logo():
    path = os.path.join(app.template_folder, 'build')
    return send_from_directory(path, 'logo192.png')


@app.route('/<path:filename>')
@login_required
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)


@app.route('/recipe_images/<path:filename>')
@login_required
def serve_images(filename):
    return send_from_directory(os.path.join(app.template_folder, "recipe_images"), filename)


@app.route('/login/image/<path:filename>')
def serve_login_jpg(filename):
    return send_from_directory(app.template_folder, 'login.png')


@app.route('/recipe/api/v1.0/set_recipeName', methods=['POST'])
@login_required
def set_recipeName():
    if request.json['recipeId'] is None:
        r = Recipe(name=request.json['recipeName'])
        db.session.add(r)
    else:
        r = Recipe.query.get(request.json['recipeId'])
        r.name = request.json['recipeName']
    try:
        db.session.commit()
        return jsonify({'recipeId': r.id})
    except IntegrityError as err:
        db.session.rollback()
        return jsonify({'error': 'Exisitert bereits!'})


@app.route('/recipe/api/v1.0/edit_group', methods=['POST'])
@login_required
def edit_group():
    if 'oldGroup' in request.json:
        for row in Recipe_Ingredient.query.filter(
            Recipe_Ingredient.group == request.json['oldGroup'],
            Recipe_Ingredient.recipe_id == request.json['recipeId']
        ):
            row.group = request.json['group']
        try:
            db.session.commit()
            return jsonify({'recipeId': request.json['recipeId']})
        except IntegrityError as err:
            db.session.rollback()
            return jsonify({'error': 'Something went wrong!'})

    return jsonify({'recipeId': request.json['recipeId']})


@app.route('/recipe/api/v1.0/edit_text', methods=['POST'])
@login_required
def edit_text():
    if 'text' in request.json:
        r = Recipe.query.get(request.json['recipeId'])
        r.description = request.json['text']
        try:
            db.session.commit()
            return jsonify({'recipeId': r.id})
        except IntegrityError as err:
            db.session.rollback()

    return jsonify({'error': 'Something went wrong!'})


@app.route('/recipe/api/v1.0/get_recipes', methods=['GET'])
def get_recipes():

    sql = db.session.query(Recipe).statement
    r = pd.read_sql(sql, db.session.bind)
    r = r.set_index(['id'])

    sql = db.session.query(Recipe_Tag, Tag).join(Tag).statement

    t = pd.read_sql(sql, db.session.bind)
    if len(t) > 0:
        t = t.groupby('recipe_id')\
            .apply(lambda x: x[['tag_id', 'name']].to_dict('r'))\
            .rename('tags')
    else:
        t = pd.DataFrame(columns=['tags'])

    sql = db.session.query(Recipe_Ingredient).\
        join(Ingredient).\
        outerjoin(Unit).\
        with_entities(
        Recipe_Ingredient,
        Ingredient.name.label("ingredient"),
        Unit.name.label("unit")
    ).order_by(Recipe_Ingredient.order.asc()).statement

    ri = pd.read_sql(sql, db.session.bind)
    if len(ri) > 0:
        ri = ri.groupby(['recipe_id', 'group'], as_index=False)\
            .apply(lambda x: x[['id', 'quantity', 'unit_id', 'ingredient_id', 'unit', 'ingredient']].to_dict('r'))\
            .reset_index(level='group')\
            .rename(columns={0: 'items'})\
            .groupby(['recipe_id'])\
            .apply(lambda x: x[['group', 'items']].to_dict('r'))\
            .rename('ingredients')
    else:
        ri = pd.DataFrame(columns=['ingredients'])

    r = pd.concat([r, t, ri], axis=1, sort=False)
    r.insert(0, 'id', r.index)
    r = r.to_json(orient='records')

    return r


@app.route('/recipe/api/v1.0/get_preset', methods=['GET'])
@login_required
def get_preset():
    sql = db.session.query(Ingredient).with_entities(
        Ingredient.id, Ingredient.name).statement
    i = pd.read_sql(sql, db.session.bind)
    i.sort_values(by=['name'], inplace=True)
    i = i.to_dict('records')

    sql = db.session.query(Unit).with_entities(Unit.id, Unit.name).statement
    u = pd.read_sql(sql, db.session.bind)
    u.sort_values(by=['name'], inplace=True)
    u = u.to_dict('records')

    res = {
        "units": u,
        "ingredients": i
    }

    return jsonify(res)


@app.route('/recipe/api/v1.0/edit_recipe_ingredient', methods=['POST'])
@login_required
def edit_recipe_ingredient():

    if 'remove' in request.json:
        if request.json['remove'] == True:
            ri = Recipe_Ingredient.query.filter_by(
                id=request.json['id']).delete()
            db.session.commit()
            return jsonify({'id': -1})

    if 'moveUp' in request.json:
        ri1 = Recipe_Ingredient.query.get(request.json['id'])
        if ri1.order == None:
            ri1.order = 1
        else:
            ri = Recipe_Ingredient.query.filter(
                Recipe_Ingredient.recipe_id == request.json['recipe_id'],
                Recipe_Ingredient.order <= ri1.order,
                Recipe_Ingredient.group == request.json['group']
            ).order_by(Recipe_Ingredient.order.desc()).all()
            if len(ri) == 1:
                print('Nothing to do')
            elif ri1.order == ri[1].order:
                ri1.order = Recipe_Ingredient.query.filter(
                    Recipe_Ingredient.recipe_id == request.json['recipe_id'],
                    Recipe_Ingredient.order != None,
                    Recipe_Ingredient.group == request.json['group']
                ).order_by(Recipe_Ingredient.order.asc()).first().order - 1
            else:
                tmp = ri1.order
                ri1.order = ri[1].order
                ri[1].order = tmp

        db.session.commit()
        return jsonify({'id': ri1.id})

    if request.json['quantity'] == '' or 'quantity' not in request.json:
        quantity = None
    else:
        quantity = request.json['quantity']

    if request.json['id'] == -1:
        max_order = db.session.query(db.func.max(Recipe_Ingredient.order))\
            .filter_by(recipe_id=request.json['recipe_id']).scalar()

        if max_order == None:
            max_order = 0

        ri = Recipe_Ingredient(
            group=request.json['group'],
            order=int(max_order) + 1,
            quantity=quantity,
            unit_id=request.json['unit_id'],
            ingredient_id=request.json['ingredient_id'],
            recipe_id=request.json['recipe_id']
        )
        db.session.add(ri)
        db.session.commit()

    if request.json['id'] != -1:
        ri = Recipe_Ingredient.query.get(request.json['id'])
        ri.quantity = quantity
        ri.unit_id = request.json['unit_id']
        ri.ingredient_id = request.json['ingredient_id']
        ri.recipe_id = request.json['recipe_id']
        ri.group = request.json['group']

        db.session.commit()

    return jsonify({'id': ri.id})


@app.route('/recipe/api/v1.0/add_image', methods=['POST'])
@login_required
def add_image():
    recipeId = request.form['recipeId']
    timestr = '_' + time.strftime("%H%M%S")

    im = Image.open(request.files.get('image', '')).convert('RGB')

    r = Recipe.query.get(recipeId)

    if request.form['imageType'] == 'image-input':
        r.image_filename = '/recipe_images/' + \
            str(recipeId) + timestr + '_thumb.jpg'
        db.session.commit()

        filename = r.image_filename
        width, height = im.size
        des_ratio = 4 / 3

        if width / height <= des_ratio:
            left = 0
            right = width
            top = (height - width / des_ratio) / 2
            bottom = (height + width / des_ratio) / 2
        else:
            left = (width - height * des_ratio) / 2
            right = (width + height * des_ratio) / 2
            top = 0
            bottom = height

        im = im.crop((left, top, right, bottom))
        im = im.resize((300, int(300 / des_ratio)))
        im.save(os.path.join(app.config['UPLOAD_FOLDER'], str(
            recipeId) + timestr + '_thumb.jpg'))
    else:
        r.photo_filename = '/recipe_images/' + \
            str(recipeId) + '_' + str(recipeId) + timestr + '.jpg'
        db.session.commit()

        filename = r.photo_filename
        width, height = im.size
        im = im.resize((600, int(600 / width * height)))
        im.save(os.path.join(app.config['UPLOAD_FOLDER'], str(
            recipeId) + '_' + str(recipeId) + timestr + '.jpg'))

    return jsonify({'filename': filename})


@app.route('/recipe/api/v1.0/add_item', methods=['POST'])
@login_required
def add_item():
    table = eval(request.json['type'])
    if 'id' in request.json:
        t = table.query.get(request.json['id'])
        t.name = request.json['name']
        if 'categoryId' in request.json:
            t.category_id = request.json['categoryId']
    else:
        t = table(name=request.json['name'])
        if 'categoryId' in request.json:
            t.category_id = request.json['categoryId']
        db.session.add(t)
    try:
        db.session.commit()
        sql = db.session.query(
            table).filter(
            table.id == t.id
        ).statement
        t = pd.read_sql(sql, db.session.bind)
        return jsonify(t.to_dict('r')[0])

    except IntegrityError as err:
        db.session.rollback()
        return jsonify({'error': 'Exisitert bereits!'})


@app.route('/recipe/api/v1.0/add_unit', methods=['POST'])
@login_required
def add_unit():
    if request.json['id'] > 0:
        u = Unit.query.get(request.json['id'])
        u.name = request.json['name']
        u.group = request.json['group']
        u.factor = request.json['factor']
    else:
        u = Unit(name=request.json['name'],
                 group=request.json['group'],
                 factor=request.json['factor']
                 )
        db.session.add(u)
    try:
        db.session.commit()
        return jsonify({'id': u.id})

    except IntegrityError as err:
        db.session.rollback()
        return jsonify({'error': 'Exisitert bereits!'})


@app.route('/recipe/api/v1.0/get_items', methods=['GET'])
@login_required
def get_items():
    res = {}
    for table in [Ingredient, Unit, Tag, Category]:
        t = pd.read_sql(table.query.statement, db.session.bind)
        t.replace({np.nan: None}, inplace=True)
        if table == Unit:
            t.sort_values(by=['group', 'factor'], inplace=True)
        t = t.to_dict('r')
        res[table.__tablename__] = t

    return jsonify(res)


@app.route('/recipe/api/v1.0/update_tag', methods=['POST'])
@login_required
def update_tag():
    if request.json['active']:
        t = Recipe_Tag.query.filter_by(
            recipe_id=request.json['recipeId'], tag_id=request.json['tagId']).delete()
    else:
        t = Recipe_Tag(
            recipe_id=request.json['recipeId'], tag_id=request.json['tagId'])
        db.session.add(t)
    db.session.commit()
    return jsonify({'success': 'Hat funktioniert!'})


@app.route('/recipe/api/v1.0/edit_shopping', methods=['POST'])
def edit_shopping():
    if 'clear' in request.json and 'recipeId' in request.json:
        Shopping.query.filter_by(recipe_id=request.json['recipeId']).delete()
        db.session.commit()
        return jsonify({'success': 'Hat funktioniert!'})

    if 'clear' in request.json and 'id' in request.json:
        Shopping.query.filter_by(id=request.json['id']).delete()
        db.session.commit()
        return jsonify({'success': 'Hat funktioniert!'})

    if 'clear' in request.json:
        Shopping.query.delete()
        db.session.commit()
        return jsonify({'success': 'Hat funktioniert!'})

    if 'recipeId' in request.json:
        s = pd.read_sql(db.session.query(Shopping).filter(
            Shopping.recipe_id == request.json['recipeId']).statement, db.session.bind)
        if len(s) == 0:
            sql = db.session.query(Recipe_Ingredient).\
                join(Ingredient).\
                outerjoin(Unit).\
                with_entities(
                Recipe_Ingredient.recipe_id,
                Recipe_Ingredient.quantity,
                Recipe_Ingredient.ingredient_id,
                Ingredient.name.label("item"),
                Unit.name.label("unit")
            ).filter(
                Recipe_Ingredient.recipe_id == request.json['recipeId']
            ).statement

            ri = pd.read_sql(sql, db.session.bind)
            ri['quantity'] = ri['quantity'].mul(request.json['factor']).round(2)
            ri.to_sql("shopping", con=db.engine,
                      if_exists="append", index=False)
            return jsonify({'success': 'Hat funktioniert!'})
        else:
            return jsonify({'error': 'Hat nicht funktioniert!'})
    else:
        return jsonify({'error': 'Hat nicht funktioniert!'})


@app.route('/recipe/api/v1.0/get_shopping', methods=['GET'])
def get_shopping():
    sql = db.session.query(Shopping).\
        outerjoin(Recipe, Shopping.recipe_id == Recipe.id).\
        outerjoin(Ingredient, Shopping.item == Ingredient.name).\
        outerjoin(Category, Ingredient.category_id == Category.id).\
        with_entities(
        Recipe.name.label("recipe_name"),
        Shopping,
        Category.name.label("category")
    ).statement

    s = pd.read_sql(sql, db.session.bind)
    s.replace({np.nan: None}, inplace=True)
    s.sort_values(by=['category','item'], inplace=True)
    s["category"].fillna('Andere', inplace=True)

    if len(s) > 0:
        s1 = s[['recipe_id', 'recipe_name']].drop_duplicates().to_dict('r')
        s = s.groupby(['category'], as_index=True)\
            .apply(lambda x: x[[
                'id',
                'recipe_id',
                'quantity',
                'ingredient_id',
                'unit',
                'item'
            ]].to_dict('r'))\
            .rename('items')\
            .reset_index()

        return jsonify({'recipes': s1, 'ingredients': s.to_dict('r')})

    return jsonify({})
