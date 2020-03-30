import os
from flask import Flask
from config import Config

template_dir = os.path.join("templates")
static_dir = os.path.join(template_dir,"build","static")

app = Flask(__name__,
            static_folder=static_dir,
            template_folder=template_dir)

app.config.from_object(Config)

from app import routes