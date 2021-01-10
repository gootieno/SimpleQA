from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .admin import Admin  # noqa
from .rooms import Room  # noqa
from .questions import Question  # noqa