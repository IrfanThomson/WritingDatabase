from flask_marshmallow import Marshmallow
from models import File
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, fields

ma = Marshmallow()

class StorySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = File

story_schema = StorySchema()