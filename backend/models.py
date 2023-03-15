from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.debug=True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://admin:admin@writingdatabase.cluster-cpa1c490xrlk.us-east-1.rds.amazonaws.com'
db = SQLAlchemy(app)

class Story(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(50))
    gDocsLink = db.Column(db.String(300))
    date = db.Column(db.Date)
    rating = db.Column(db.Integer)
    genre = db.Column(db.String(20))
    length = db.Column(db.String(20))
    url = db.Column(db.String(300))
    img = db.Column(db.String(300))

class Note(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(50))
    gDocsLink = db.Column(db.String(300))
    date = db.Column(db.Date)
    rating = db.Column(db.Integer)
    category = db.Column(db.String(20))
    url = db.Column(db.String(300))
    img = db.Column(db.String(300))

class Reference(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(50))
    gDocsLink = db.Column(db.String(300))
    date = db.Column(db.Date)
    rating = db.Column(db.Integer)
    genre = db.Column(db.String(20))
    medium = db.Column(db.String(20))
    url = db.Column(db.String(300))
    img = db.Column(db.String(300))

class Idea(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(50))
    gDocsLink = db.Column(db.String(300))
    date = db.Column(db.Date)
    rating = db.Column(db.Integer)
    genre = db.Column(db.String(20))
    url = db.Column(db.String(300))
    img = db.Column(db.String(300))
