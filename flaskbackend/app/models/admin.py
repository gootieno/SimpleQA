from ..models import db  

class Admin(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    admin_id=db.Column(db.Interger)
    cohort_id = db.Column(db.Integer, db.ForeignKey('cohorts.id'), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id'), nullable=False)



    def to_dict():
        return {
            'id': self.id
        }