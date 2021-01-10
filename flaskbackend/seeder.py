from app import app
from app.models import db
from app.models.admin import Admin
from app.models.questions import Question
from app.models.rooms import Room

with app.app_context():
  db.drop_all()
  db.create_all()


  room1 = Room(
    id=1, 
    room_name='Team Jeff',
  )
  
  admin1 = Admin(
    id=1,
    module='Python',
    room_id=1
  )

  question1 = Question(
    id=1, 
    question='What is python',
    askers_name='demo user',
    up_votes=0,
    replies='{instructor_replies: [], student_replies: []}',
    room_id=1,
  )

  db.session.add(room1)
  db.session.add(admin1)
  db.session.add(question1)

  db.session.commit()