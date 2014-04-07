import os
from tv import app

def runserver():
    listen = os.environ.get('LISTEN', '0.0.0.0')
    port = int(os.environ.get('PORT', 8080))
    app.debug = True
    app.run(host=listen, port=port)

if __name__ == '__main__':
    runserver()
