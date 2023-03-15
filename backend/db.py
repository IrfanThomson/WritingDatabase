import json
import datetime
from models import app, db, Story, Note, Reference

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
                        "rating" : stories["rating"],
                        "genre" : stories["genre"],
                        "length" : stories["length"],
                        "url" : stories["url"],
                        "img" : stories["img"]
                }
                db.session.add(Story(**db_row))
            db.session.commit()

def populate_notes():
     with open("data/notes.json") as jsn:
            note_data = json.load(jsn)
            for notes in note_data:
                db_row = {
                        "id" : notes["id"],
                        "title" : notes["title"],
                        "gDocsLink" : notes["gDocsLink"],
                        "date" : datetime.datetime.strptime(notes["date"], "%d%m%Y").date(),
                        "rating" : notes["rating"],
                        "category" : notes["category"],
                        "url" : notes["url"],
                        "img" : notes["img"]
                }
                db.session.add(Note(**db_row))
            db.session.commit()

def populate_references():
     with open("data/references.json") as jsn:
            reference_data = json.load(jsn)
            for references in reference_data:
                db_row = {
                        "id" : references["id"],
                        "title" : references["title"],
                        "gDocsLink" : references["gDocsLink"],
                        "date" : datetime.datetime.strptime(references["date"], "%d%m%Y").date(),
                        "rating" : references["rating"],
                        "genre" : references["genre"],
                        "medium" : references["medium"],
                        "url" : references["url"],
                        "img" : references["img"]
                }
                db.session.add(Reference(**db_row))
            db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all()
        populate_db()