from flask import jsonify, request, Response
from models import app, db, Story
from schema import stories_schema
from sqlalchemy import or_
from sqlalchemy.sql import text, column, desc
import json

DEFAULT_PAGE_SIZE = 20

@app.route("/")
def home():
    try:
        db.session.query(column('1')).from_statement(text('SELECT 1')).all()
        return '<h1>WW Database API</h1>'
    except Exception as e:
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text
    
@app.route("/search/<string:query>")
def search_all(query):
    terms = query.split()
    occurrences = {
        **search_stories(terms),
    }
    objs = sorted(occurrences.keys(), key=lambda x: occurrences[x], reverse=True)
    stories = [story for story in objs if type(story) == Story]
    story_results = stories_schema.dump(stories, many=True)
    return jsonify(
        {"stories": story_results}
    )

@app.route("/search/<string:model>/<string:query>")
def search_models(model, query):
    model = model.strip().lower()
    terms = query.split()
    result = None
    if model == "story":
        occurrences = search_stories(terms)
        stories = sorted(occurrences.keys(), key=lambda x: occurrences[x], reverse=True)
        result = stories_schema.dump(stories, many=True)
    else:
        return_error(f"Invalid model: {model}")
    return jsonify({"data": result})


def search_stories(terms):
    occurrences = {}
    for term in terms:
        queries = []
        queries.append(Story.title.contains(term))
        queries.append(Story.rating.contains(term))
        stories = Story.query.filter(or_(*queries))
        for story in stories:
            if not story in occurrences:
                occurrences[story] = 1
            else:
                occurrences[story] += 1
    return occurrences

@app.route("/stories")
def get_stories():
    # get args
    page = request.args.get("page", type=int)
    perPage = request.args.get("perPage", type=int)
    query = db.session.query(Story)
    count = query.count()
    rating = request.args.get("rating")
    genre = request.args.get("genre")
    length = request.args.get("length")
    sort = request.args.get("sort")
    asc = request.args.get("asc")

    # FILTERING
    if rating is not None:
        rating.replace("and", "&")
        query = query.filter(Story.rating == (rating))
    if genre is not None:
        genre.replace("and", "&")
        query = query.filter(Story.genre == (genre))
    if length is not None:
        length.replace("and", "&")
        query = query.filter(Story.length == (length))

    # Sort
    if sort is not None and getattr(Story, sort) is not None:
        if asc is not None:
            query = query.order_by(getattr(Story, sort))
        else:
            query = query.order_by(desc(getattr(Story, sort)))

    if page is not None:
        query = paginate(query, page, perPage)
    result = stories_schema.dump(query, many=True)
    return jsonify({"data": result, "meta": {"count": count}})

@app.route("/stories/<int:r_id>")
def get_player(r_id):
    query = db.session.query(Story).filter_by(id=r_id)
    try:
        result = stories_schema.dump(query, many=True)[0]
    except IndexError:
        return return_error(f"Invalid story ID: {r_id}")
    return jsonify({
        "data": result
    })



"""
Returns a 404 error with the given msg
"""
def return_error(msg):
    resp = Response(json.dumps({"error": msg}), mimetype="application/json")
    resp.error_code = 404
    return resp

"""
Returns a paginated query according the page number and number per page
"""
def paginate(query, page_num, num_per_page):
    if num_per_page is None:
        num_per_page = DEFAULT_PAGE_SIZE
    return query.paginate(page=page_num, per_page=num_per_page, error_out=False).items


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
