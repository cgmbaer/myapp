import os
from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

template_dir = os.path.join("templates")
static_dir = os.path.join(template_dir,"build","static")

app = Flask(__name__,
            static_folder=static_dir,
            template_folder=template_dir
            )

app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app import routes, models