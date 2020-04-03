# Dependencies: Flask, flask-cors
# To install Flask: `pip install Flask`
# To install flask-cors: `pip install -U flask-cors`
# Follow their offical documentation for details

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def root():
    return 'SERVER ALIVE'

@app.route('/search')
def search():
    query = request.args.get('q')
    return {"echo" : query}

@app.route('/register', methods=['POST'])
def register():
    req_body = request.json()
    username = req_body['username']
    password = req_body['password']
    email = req_body['eamil']
    # created_date = ddmmyy

    # TODO: If username, password all valid, create a new user, insert proper
    # entries to the database
    # Otherwise return some error message or error code

    return {'uid':12345}

@app.route('/signin', methods=['POST'])
def signin():
    req_body = request.json()
    username = req_body['username']
    password = req_body['password']
    
    # TODO: If username, password all valid, log user in
    # Otherwise return some error message or error code

    return {'uid':12345}

if __name__ == '__main__':
    app.run(debug=True)