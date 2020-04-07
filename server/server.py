# Dependencies: Flask, flask-cors, pymysql, simplejson
# To install Flask: `pip install Flask`
# To install flask-cors: `pip install -U flask-cors`
# To install pymsql: `python3 -m pip install PyMySQL[rsa]`
# To install simplejson: `pip install simplejson`
# Follow their offical documentation for details

# Note before connected to local mysql db, you will need to set up a privilege(s) granted account
# For simplicity, let's create a user called x86 for all of us
# To create user: run `CREATE USER 'x86'@'localhost' IDENTIFIED BY 'x86x86';` as root
# To grant privilege: run `GRANT ALL PRIVILEGES ON boba.* TO 'x86'@'localhost';` as root

from flask import Flask, request, jsonify, redirect, session
from flask_cors import CORS
import pymysql
import simplejson as json
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)

conn = pymysql.connect(user='x86', host='localhost', passwd='x86x86', db='boba',cursorclass=pymysql.cursors.DictCursor)

@app.route('/')
def root():
    return 'SERVER ALIVE'

@app.route('/search', methods=['GET'])
def search():
    cur = conn.cursor()
    query = request.args.get('q')
    sql = "select * from product where product_name like '%" + query + "%'"
    cur.execute(sql)
    datas = cur.fetchall()
    dict = {}
    count = 1
    for i in datas:
        dict[count] = i
        count += 1
    return dict

@app.route('/register', methods=['POST'])
def register():       
    req_body = request.json
    username = req_body['username']
    password = req_body['password']
    email = req_body['email']
    # created_date = ddmmyy

    cur = conn.cursor()
    userid_sql = "select count(*) as cnt from user;"
    cur.execute(userid_sql)
    user_id = cur.fetchone()['cnt']
    result = cur.execute("insert into user(user_id, user_name, password, email) VALUES(%s,%s,%s,%s)", (int(user_id), str(username), str(password), str(email)))
    # commit to DB
    conn.commit()
    # close connection
    cur.close()

    if result: return {'user_id':user_id}
    else: return {'err_msg':'Unable to register the user!'}


@app.route('/login', methods=['POST'])
def signin():
    req_body = request.json
    email = req_body['email']
    password = req_body['password']

    cur = conn.cursor()
    result = cur.execute("SELECT * FROM user WHERE email = %s" ,[email])
    if result > 0 :
        data = cur.fetchone()
        password_db = data['password']
        uid = data['user_id']
        username = data['user_name']

        if password == password_db:
            # session['logged_in'] = True
            # session['username'] = username
            return {'user_id':uid, 'username':username}
        else:              
            return{'err_msg':"Incorrect Password"}
    else:
        return {'err_msg':'Incorrect Username'}


@app.route('/write-review', methods=['POST'])
def write_review():
    req_body = request.json
    uid = req_body['user_id']
    product_id = req_body['product_id']
    review_content = req_body['review_content']

    cur = conn.cursor()
    return {}


if __name__ == '__main__':
    app.run(debug=True)
