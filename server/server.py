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

from flask import Flask, request, jsonify, redirect, session, flash
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
    if request.method == "POST":      
        req_body = request.json        
        username = req_body['username']        
        password = req_body['password']        
        email = req_body['email']    
        # created_date = ddmmyy

        cur = conn.cursor()
        userid_sql = "select count(*) from user"
        cur.execute(userid_sql)
        user_id = cur.fetchall()
        cur.execute("insert into user(user_id, user_name, password, email) VALUES(%s,%s,%s,%s)", (int(user_id), str(username), str(password), str(email)))
        # commit to DB
        # mysql.connection.commit()
        # close connection
        # cur.close()
        # flash("You are now Registered and you can login" , 'success')
        # redirect(url_for('login'))
        
    return {'uid':12345}


@app.route('/login', methods=['POST'])
def signin():    
    if request.method == "POST":        
        req_body = request.json        
        email = req_body['email']        
        password = req_body['password']

        cur = conn.cursor()        
        result = cur.execute("SELECT * FROM users WHERE email = %s" ,[email])
        if result > 0 :            
            data = cur.fetchone()            
            password_db = data['password']            
            if password == password_db:                
                session['logged_in'] = True                
                # session['username'] = username                
                flash('You are now logged in ','success')
                # return redirect(url_for('dashboard'))                
                return {'uid':12345}            
            else:                
                flash("Incorrect password")                
                # return redirect("/login")                
                return {'uid':12345}
        else:           
            error = 'Username not found'    
    return {'uid':12345}

if __name__ == '__main__':
    app.run(debug=True)
