from flask_marshmallow import Marshmallow
from models import Story
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, fields

ma = Marshmallow()

class StoriesSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Story

stories_schema = StoriesSchema()