from flask_marshmallow import Marshmallow
from models import File
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, fields

ma = Marshmallow()

class StoriesSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = File

stories_schema = StoriesSchema()