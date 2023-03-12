import json
import datetime
from models import app, db, Story

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
                        "date" : datetime.datetime.strptime(stories["date"], "%d%m%Y").date(),
                        "rating" : stories["rating" ],
                        "genre" : stories["genre"],
                        "length" : stories["length"],
                        "url" : stories["url"],
                        "img" : stories["img"]
                }
                db.session.add(Story(**db_row))
            db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all()
        populate_db()