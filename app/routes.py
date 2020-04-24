import os
import sys
import time
import pandas as pd
from app import app, db
from sqlalchemy.exc import IntegrityError
from app.models import Recipe, Tag, Ingredient
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


@app.route('/recipe/api/v1.0/get_recipe', methods=['GET'])
def get_recipe():
    id = request.json['recipeId']
    return jsonify({'developer': Recipe.query.get(id).serialize()})


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


@app.route('/recipe/api/v1.0/get_recipes', methods=['GET'])
def get_recipes():
    #response = jsonify(list(map(lambda x: x.serialize(), Recipe.query.all())))
    sql = db.session.query(Recipe).statement
    df = pd.read_sql(sql, db.session.bind)
    return df.to_json(orient='records')


@app.route('/recipe/api/v1.0/add_image', methods=['POST'])
def add_image():
    recipeId = request.form['recipeId']
    timestr = '_' + time.strftime("%H%M%S")

    im = Image.open(request.files.get('image', '')).convert('RGB')
    #im.save(os.path.join(app.config['UPLOAD_FOLDER'], str(recipeId) + timestr + '.jpg'))

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
        if request.json['name'] != '':
            print(type(request.json['name']))
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