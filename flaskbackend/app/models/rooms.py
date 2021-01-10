from ..models import db

class Room(db.Model):
    __tablename__ = "rooms"

    id = db.Column(db.Integer, primary_key=True)
    room_name = db.Column(db.String(50), nullable=False)
    
    questions = db.relationship('Question', back_populates='rooms')

    def to_dict():
        return {
            'id': self.id, 
            'room_name': self.room_name,
        }