from ..models import db

class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Interger, primary_key=True)
    question = db.Column(db.Text)
    askers_name = db.Column(db.String(100), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id'), nullable=False)