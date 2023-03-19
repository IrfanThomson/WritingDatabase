from flask import jsonify, request, Response
from models import app, db, Story, Note, Reference
from schema import stories_schema, notes_schema, references_schema
from sqlalchemy import or_, case
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
        **search_notes(terms),
        **search_references(terms)
    }
    objs = sorted(occurrences.keys(), key=lambda x: occurrences[x], reverse=True)
    stories = [story for story in objs if type(story) == Story]
    story_results = stories_schema.dump(stories, many=True)
    notes = [note for note in objs if type(note) == Note]
    note_results = notes_schema.dump(notes, many=True)
    references = [reference for reference in objs if type(reference) == Reference]
    reference_results = stories_schema.dump(references, many=True)
    return jsonify(
        {"stories": story_results, "notes": note_results, "references:":reference_results}
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
    if model == "note":
        occurrences = search_notes(terms)
        notes = sorted(occurrences.keys(), key=lambda x: occurrences[x], reverse=True)
        result = notes_schema.dump(notes, many=True)
    if model == "reference":
        occurrences = search_stories(terms)
        references = sorted(occurrences.keys(), key=lambda x: occurrences[x], reverse=True)
        result = references_schema.dump(references, many=True)
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

def search_notes(terms):
    occurrences = {}
    for term in terms:
        queries = []
        queries.append(Note.title.contains(term))
        queries.append(Note.rating.contains(term))
        notes = Note.query.filter(or_(*queries))
        for note in notes:
            if not note in occurrences:
                occurrences[note] = 1
            else:
                occurrences[note] += 1
    return occurrences

def search_references(terms):
    occurrences = {}
    for term in terms:
        queries = []
        queries.append(Reference.title.contains(term))
        queries.append(Reference.rating.contains(term))
        references = Reference.query.filter(or_(*queries))
        for reference in references:
            if not reference in occurrences:
                occurrences[reference] = 1
            else:
                occurrences[reference] += 1
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
        query = query.filter(Story.rating == (rating))
    if genre is not None:
        query = query.filter(Story.genre == (genre))
    if length is not None:
        query = query.filter(Story.length == (length))

    # Sort
    if sort is not None and getattr(Story, sort) is not None:
        if asc is not None:
            query = query.order_by(getattr(Story, sort))
        else:
            query = query.order_by(desc(getattr(Story, sort)))
    else:
        query = query.order_by(desc(Story.rating))

    if page is not None:
        query = paginate(query, page, perPage)
    result = stories_schema.dump(query, many=True)
    return jsonify({"data": result, "meta": {"count": count}})

@app.route("/stories/<int:r_id>")
def get_story(r_id):
    query = db.session.query(Story).filter_by(id=r_id)
    try:
        result = stories_schema.dump(query, many=True)[0]
    except IndexError:
        return return_error(f"Invalid story ID: {r_id}")
    return jsonify({
        "data": result
    })

@app.route("/notes")
def get_notes():
    # get args
    page = request.args.get("page", type=int)
    perPage = request.args.get("perPage", type=int)
    query = db.session.query(Note)
    count = query.count()
    rating = request.args.get("rating")
    category = request.args.get("category")
    sort = request.args.get("sort")
    asc = request.args.get("asc")

    # FILTERING
    if rating is not None:
        query = query.filter(Note.rating == (rating))
    if category is not None:
        query = query.filter(Note.category == (category))

    # Sort
    if sort is not None and getattr(Note, sort) is not None:
        if asc is not None:
            query = query.order_by(getattr(Note, sort))
        else:
            query = query.order_by(desc(getattr(Note, sort)))

    if page is not None:
        query = paginate(query, page, perPage)
    result = notes_schema.dump(query, many=True)
    return jsonify({"data": result, "meta": {"count": count}})

@app.route("/notes/<int:r_id>")
def get_note(r_id):
    query = db.session.query(Note).filter_by(id=r_id)
    try:
        result = notes_schema.dump(query, many=True)[0]
    except IndexError:
        return return_error(f"Invalid story ID: {r_id}")
    return jsonify({
        "data": result
    })

@app.route("/references")
def get_references():
    # get args
    page = request.args.get("page", type=int)
    perPage = request.args.get("perPage", type=int)
    query = db.session.query(Reference)
    count = query.count()
    rating = request.args.get("rating")
    genre = request.args.get("genre")
    medium = request.args.get("medium")
    sort = request.args.get("sort")
    asc = request.args.get("asc")

    # FILTERING
    if rating is not None:
        query = query.filter(Reference.rating == (rating))
    if genre is not None:
        query = query.filter(Reference.genre == (genre))
    if medium is not None:
        query = query.filter(Reference.medium == (medium))

    # Sort
    if sort is not None and getattr(Reference, sort) is not None:
        if asc is not None:
            query = query.order_by(getattr(Reference, sort))
        else:
            query = query.order_by(desc(getattr(Reference, sort)))

    if page is not None:
        query = paginate(query, page, perPage)
    result = references_schema.dump(query, many=True)
    return jsonify({"data": result, "meta": {"count": count}})

@app.route("/references/<int:r_id>")
def get_reference(r_id):
    query = db.session.query(Reference).filter_by(id=r_id)
    try:
        result = references_schema.dump(query, many=True)[0]
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
    app.run(host="127.0.0.1", port=5000)
