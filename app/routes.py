import os
from app import app
from flask import render_template, send_from_directory


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/favicon.ico')
def serve_favicon():
    return send_from_directory(app.template_folder, 'favicon.ico')


@app.route('/manifest.json')
def serve_manifest():
    return send_from_directory(app.template_folder, 'manifest.json')


@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)