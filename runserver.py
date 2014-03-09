import os
from tv import app

def runserver():
    listen = int(os.environ.get('LISTEN', '0.0.0.0'))
    port = int(os.environ.get('PORT', 5000))
    app.debug = True
    app.run(host=listen, port=port)

if __name__ == '__main__':
    runserver()
