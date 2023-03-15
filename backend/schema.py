from flask_marshmallow import Marshmallow
from models import Story, Note, Reference
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, fields

ma = Marshmallow()

class StoriesSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Story
class NotesSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Note
class ReferencesSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Reference

stories_schema = StoriesSchema()
notes_schema = NotesSchema()
references_schema = ReferencesSchema()