import os, sys
from app import app, db
from sqlalchemy.exc import IntegrityError
from app.models import Recipe
from flask import render_template, request, redirect, send_from_directory, session, url_for, jsonify
from functools import wraps

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
    return send_from_directory(os.path.join(app.template_folder,"recipe_images"), filename)

@app.route('/login/image/<path:filename>')
def serve_login_jpg(filename):
    return send_from_directory(app.template_folder, 'login.jpg')

tasks = [
    {
        'id': 1,
        'title': u'Buy groceries',
        'description': u'Milk, Cheese, Pizza, Fruit, Tylenol', 
        'done': False
    }
]

@app.route('/recipe/api/v1.0/get_recipe', methods=['GET'])
@login_required
def get_recipe():
    return jsonify({'recipe': tasks})

@app.route('/recipe/api/v1.0/add_recipe', methods=['POST'])
def add_recipe():
    if request.json['recipeId'] is None:
        r = Recipe(name = request.json['recipeTitle'])
        db.session.add(r)
        try:
            db.session.commit()
            return jsonify({'recipeId': r.id})
        except IntegrityError as err:
            db.session.rollback()
            return jsonify({'error': 'Das Rezept exisitert bereits.'})
    return jsonify({'recipeId': request.json['recipeId']})