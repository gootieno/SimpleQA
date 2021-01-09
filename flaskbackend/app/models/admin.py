from ..models import db  

class Admin(db.Model):
    __tablename__ = 'admin'

    id = db.Column(db.Integer, primary_key=True)
    admin_id = db.Column(db.Integer)
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id'), nullable=False)
    cohort = db.Column(db.String(100), nullable=False)

    room = db.relationship('Room', back_populates='admin')

    def to_dict():
        return {
            'id': self.id,
            'admin_id': self.admin_id,
            'cohort_id': self.cohort_id,
            'room_id': self.room_id
            'name': 'Instructor'
        }