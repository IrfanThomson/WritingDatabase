from flask import jsonify, request, Response
from models import app, db, File
from schema import stories_schema
from sqlalchemy.sql import text, column
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

@app.route("/stories")
def get_stories():
    # get args
    page = request.args.get("page", type=int)
    perPage = request.args.get("perPage", type=int)
    query = db.session.query(File)
    count = query.count()
    if (page is not None):
        query = paginate(query, page, perPage)
    result = stories_schema.dump(query, many=True)
    return jsonify(
        {
            "data": result,
            "meta": {
                "count": count
            }
        }
    )

@app.route("/stories/<int:r_id>")
def get_player(r_id):
    query = db.session.query(File).filter_by(id=r_id)
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
