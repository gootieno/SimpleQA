from flask import Blueprint, request, jsonify
from ..models import db
from ..models import Room

bp = Blueprint('rooms', __name__, url_prefix='/api/rooms/')

@bp.route('')
def create_room(''):
    pass

