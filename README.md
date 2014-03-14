together-video
==============

An application that lets multiple people watch HTML5 video together.

Requirements
------------

See requires.txt

Installation
------------

### Using pip ###

```bash
sudo pip install TogetherVideo
```

Configuration
-------------

Configuration is handled via a flask configuration file, which can be defined
via the TV_SETTINGS environment variable. Here's the available
configuration and its defaults:

```python
app.config.update(
    CSRF_ENABLED = True,
    DEBUG = True,
    SECRET_KEY = 'development key',
    REQUIRE_AUTH = True,
    BACKEND = 'redis',
    REDIS = {
        'host': 'localhost',
        'port': 6379,
        'password': None,
        'db': 0
    },
    AUTH_BACKEND = 'openid',
    OPENID_FORCED_PROVIDER = 'https://www.google.com/accounts/o8/id',
    OPENID_PROVIDERS = {
        'google': 'https://www.google.com/accounts/o8/id'
    },
)
```

Development
-----------

This repo includes vagrant support, using salt as the provisioner. If you have vagrant installed, simply call:

```
vagrant up
```

When vagrant finishes provisioning the instance it'll be accessible at http://127.0.0.1:8080/tv. The vagrant instance is configured using uwsgi, so software changes will require a uwsgi restart via 'service uwsgi restart'.

Quick Usage
-----------

Execute: runserver.py

After executing it, it'll be running on port 5000.

If authentication is required, redis is necessary for openid sessions.
