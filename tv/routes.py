from flask import make_response
from flask import request
from flask import redirect
from flask import json

from tv import app
from tv import models
from tv import auth


@app.route('/')
def index():
    return make_response(open('tv/templates/index.html').read())


@app.route('/<path>')
def path_index(path):
    return make_response(open('tv/templates/index.html').read())


@app.route('/video/<video_hash>')
def video_index(video_hash):
    return redirect('#' + request.path)


@app.route('/data/<video_hash>', methods=['POST', 'GET'])
@auth.check_auth
def video_data(video_hash):
    if request.method == 'POST':
        video = models.Video(video_hash)
        if not video.exists():
            video.save({
                'video_url': request.json['video_url'],
                'video_type': request.json['video_type']
            })
    else:
        video = models.Video(video_hash)
    return video.get_json()
