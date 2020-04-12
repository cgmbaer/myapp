import os
import sys
from app import app, db
from sqlalchemy.exc import IntegrityError
from app.models import Recipe
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


@app.route('/images/<path:filename>')
@login_required
def serve_images(filename):
    return send_from_directory(os.path.join(app.template_folder, "recipe_images"), filename)


@app.route('/login/image/<path:filename>')
def serve_login_jpg(filename):
    return send_from_directory(app.template_folder, 'login.png')


@app.route('/recipe/api/v1.0/get_recipe', methods=['GET'])
@login_required
def get_recipe():
    id = request.json['recipeId']
    return jsonify({'developer': Recipe.query.get(id).serialize()})


@app.route('/recipe/api/v1.0/add_recipe', methods=['POST'])
@login_required
def add_recipe():
    if request.json['recipeId'] is None:
        r = Recipe(name=request.json['recipeTitle'])
        db.session.add(r)
    else:
        r = Recipe.query.get(request.json['recipeId'])
        r.name = request.json['recipeTitle']
    try:
        db.session.commit()
        return jsonify({'recipeId': r.id})
    except IntegrityError as err:
        db.session.rollback()
        return jsonify({'error': 'Das Rezept exisitert bereits.'})

@app.route('/recipe/api/v1.0/get_recipes', methods=['GET'])
@login_required
def get_recipes():
    return jsonify(list(map(lambda x: x.serialize(), Recipe.query.all())))

@app.route('/recipe/api/v1.0/add_image', methods=['POST'])
@login_required
def add_image():
    recipeId = request.form['recipeId']
    im = Image.open(request.files.get('image', ''))
    im = im.convert('RGB')

    if request.form['imageType'] == 'image-input':
        r = Recipe.query.get(recipeId)
        r.has_image = 1
        db.session.commit()

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

        filename = str(recipeId) + '_thumb.jpg'

        im1 = im.resize((100,int(100 / des_ratio)))
        im1.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        filename = str(recipeId) + '.jpg'
        im = im.resize((400,int(400 / des_ratio)))
    else:
        r = Recipe.query.get(recipeId)
        r.has_photo = 1
        db.session.commit()

        filename = str(recipeId) + '_' + str(recipeId) + '.jpg'

    im.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    return jsonify({'filename': filename})
