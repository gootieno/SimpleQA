from ..models import db

class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Interger, primary_key=True)
    question = db.Column(db.Text)
    askers_name = db.Column(db.String(100), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id'))
    card_id = db.Column(db.Integer, db.ForeignKey('cards.id'))

    rooms = db.relationship('Room', back_populates='questions')
    admin = db.relationship('Admin', back_populates='room')
    cards = db.relationship('Card', back_populates='questions')

    def to_dict():
        return {
            'id': self.id,
            'question': self.question,
            'asked_name': self.asked_name,
            'room_id': self.room_id, 
            'card_id': self.card_id
        }