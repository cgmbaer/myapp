import os
from flask import Flask

template_dir = os.path.join("templates", "build")
static_dir = os.path.join(template_dir, "static")

app = Flask(__name__,
            static_folder=static_dir,
            template_folder=template_dir)

from app import routes