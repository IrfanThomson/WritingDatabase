import json
from models import app, db, File

def populate_db():
    populate_stories()

def populate_stories():
     with open("data/stories.json") as jsn:
            story_data = json.load(jsn)
            for stories in story_data:
                db_row = {
                        "id" : stories["id"],
                        "title" : stories["title"],
                        "gDocsLink" : stories["gDocsLink"],
                        "date" : stories["date"],
                        "rating" : stories["rating" ]
                }
                db.session.add(File(**db_row))
            db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all()
        populate_db()