from flask import make_response
from flask import json

from tv import app
from tv import models
from tv import auth


@app.route('/')
def index():
    return make_response(open('tv/templates/index.html').read())
