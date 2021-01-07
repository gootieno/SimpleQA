from flask import Flask
from flask_migrate import Migrate
from flask_socketio import SocketIO
import os

from app.models import db
from app.config import Configuration

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

if os.environ.get("FLASK_ENV") == 'production':
    app = Flask(__name__, static_folder='../../frontend/build/static',
                static_url_path='/static')
else:
    app = Flask(__name__)

app.config.from_object(Configuration)
db.init_app(app)
migrate = Migrate(app, db)