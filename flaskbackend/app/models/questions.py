from ..models import db


class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text)
    askers_name = db.Column(db.String(100), nullable=False)
    up_votes = db.Column(db.Integer)
    replies = db.Column(db.JSON)

    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id'))
    rooms = db.relationship('Room', back_populates='questions')

    def to_dict(self):
        return {
            'id': self.id,
            'question': self.question,
            'asked_name': self.askers_name,
            'room_id': self.room_id, 
            'replies': self.replies, 
            'up_votes': self.up_votes
        }