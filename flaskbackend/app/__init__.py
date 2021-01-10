from flask import Flask
from flask_migrate import Migrate
from flask_socketio import SocketIO
from app.config import Configuration
import os

#DB Imports
from app.models import db

#BP Imports
from app.routes import question_route



app = Flask(__name__)
# socketio = SocketIO(app)

app.config.from_object(Configuration)
db.init_app(app)
Migrate(app, db)

app.register_blueprint(question_route.bp)

@app.route('/')
def hi():
    return "<h1>Hello</h1>"