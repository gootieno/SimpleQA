from ..models import db

class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)
    like = db.Column(db.Boolean, default=False)
    replies = db.Column(db.JSON)

    questions = db.relationship('Question', back_populates='cards')

    def to_dict():
        return {
            'id': self.id, 
            'like': self.like,
            'replies': self.replies, 
        }