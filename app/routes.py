import os
import sys
import time
import pandas as pd
from app import app, db
from sqlalchemy.exc import IntegrityError
from app.models import Recipe, Tag, Ingredient, Unit, Category, Recipe_Tag, Recipe_Ingredient
from flask import render_template, request, redirect, send_from_directory, session, url_for, jsonify
from functools import wraps
from PIL import Image


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

    sql = db.session.query(Recipe_Tag,Tag).join(Tag).statement

    t = pd.read_sql(sql, db.session.bind)
    t = t.groupby('recipe_id')\
        .apply(lambda x: x[['tag_id', 'name']].to_dict('r'))\
        .rename('tags')

    sql = db.session.query(Recipe_Ingredient).\
        join(Ingredient).\
        outerjoin(Unit).\
        with_entities(
        Recipe_Ingredient,
        Ingredient.name.label("ingredient"),
        Unit.name.label("unit")
    ).statement

    ri = pd.read_sql(sql, db.session.bind)
    ri = ri.groupby(['recipe_id', 'group'], as_index=False)\
        .apply(lambda x: x[['id', 'quantity', 'unit_id', 'ingredient_id', 'unit', 'ingredient']].to_dict('r'))\
        .reset_index(level='group')\
        .rename(columns={0: 'items'})\
        .groupby(['recipe_id'])\
        .apply(lambda x: x[['group', 'items']].to_dict('r'))\
        .rename('ingredients')

    r = pd.concat([r, t, ri], axis=1, sort=False)

    r.insert (0, 'id', r.index)
    r = r.to_json(orient='records')
    return r


@app.route('/recipe/api/v1.0/get_preset', methods=['GET'])
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
def edit_recipe_ingredient():
    if request.json['quantity'] == '' or 'quantity' not in request.json:
        quantity = None
    else:
        quantity = request.json['quantity']

    if request.json['id'] == -1 and request.json['remove'] == False:
        ri = Recipe_Ingredient(
            group=request.json['group'],
            quantity=quantity,
            unit_id=request.json['unit_id'],
            ingredient_id=request.json['ingredient_id'],
            recipe_id=request.json['recipe_id']
        )
        db.session.add(ri)
        db.session.commit()

    if request.json['id'] != -1 and request.json['remove'] == False:
        ri = Recipe_Ingredient.query.get(request.json['id'])
        ri.quantity = quantity
        ri.unit_id = request.json['unit_id']
        ri.ingredient_id = request.json['ingredient_id']
        ri.recipe_id = request.json['recipe_id']
        ri.group = request.json['group']

        db.session.commit()

    if request.json['remove'] == True:
        ri = Recipe_Ingredient.query.filter_by(id=request.json['id']).delete()
        db.session.commit()
        return jsonify({'id': -1})

    return jsonify({'id': ri.id})


@app.route('/recipe/api/v1.0/add_image', methods=['POST'])
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
        im.save(os.path.join(app.config['UPLOAD_FOLDER'], str(
            recipeId) + '_' + str(recipeId) + timestr + '.jpg'))

    return jsonify({'filename': filename})


@app.route('/recipe/api/v1.0/add_item', methods=['POST'])
def add_item():
    if 'id' in request.json:
        t = eval(request.json['type']).query.get(request.json['id'])
        t.name = request.json['name']
        try:
            db.session.commit()
            return jsonify({'success': 'Name geändert'})
        except IntegrityError as err:
            db.session.rollback()
            return jsonify({'error': 'Exisitert bereits!'})
    if request.json['name'] != '':
        t = eval(request.json['type'])(name=request.json['name'])
        db.session.add(t)
        try:
            db.session.commit()
        except IntegrityError as err:
            db.session.rollback()
            return jsonify({'error': 'Exisitert bereits!'})

    sql = db.session.query(eval(request.json['type'])).statement
    df = pd.read_sql(sql, db.session.bind)
    df.sort_values(by=['name'], inplace=True)
    return df.to_json(orient='records')


@app.route('/recipe/api/v1.0/update_tag', methods=['POST'])
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
