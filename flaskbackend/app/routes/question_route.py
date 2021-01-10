from flask import Blueprint, request, jsonify
from ..models import db
from ..models import Question

bp = Blueprint('questions', __name__, url_prefix='/api/questions/')


@bp.route('')
def get_all_questions():
    #Search Questions based on room id
    questions = db.session.query(Question).all()
    questions = [question.to_dict() for question in questions]
    return jsonify({'questions': questions})