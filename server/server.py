from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/search')
def search():
    query = request.args.get('q')
    return {"echo" : query}


if __name__ == '__main__':
    app.run(debug=True)