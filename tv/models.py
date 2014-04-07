import redis
import time
import os

from tv import app
from tv import redis
from flask import json


class User(object):

    def __init__(self, identity_url):
        self.identity_url = identity_url
        self.key = 'tv:users:{0}'.format(identity_url)
        self._load_user()

    def _load_user(self):
        self.data = redis.hgetall(self.key)

    def get_name(self):
        return self.data['fullname']

    def exists(self):
        return 'identity_url' in self.data

    def save(self, openid):
        mapping = {
            'identity_url': openid.identity_url,
            'fullname': openid.fullname,
            'nickname': openid.nickname,
            'email': openid.email
        }
        redis.hmset(self.key, mapping)

    def get_json(self):
        return json.dumps(redis.hgetall(self.key))


class Video(object):

    def __init__(self, video_hash):
        self.video_hash = video_hash
        self.key = 'tv:videos:{0}'.format(video_hash)
        self._load_video()

    def _load_video(self):
        self.data = redis.hgetall(self.key)

    def exists(self):
        return 'video_url' in self.data

    def save(self, video):
        redis.hmset(self.key, video)
        self._load_video()

    def get_json(self):
        return json.dumps(redis.hgetall(self.key))


