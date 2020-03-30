import os, sys
from app import app
from flask import render_template, request, redirect, send_from_directory, session, url_for
from functools import wraps

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