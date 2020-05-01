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


# Add mongodb connection string into our application code : mongodb+srv://x86:x86x86@boba-explorer-wmgsu.mongodb.net/test?retryWrites=true&w=majority
# Replace <password> with the password for the user : x86x86
# To install pymongo : `python -m pip install pymongo`
# To install dnspython : `pip install dnspython`


from flask import Flask, request, jsonify, redirect, session
from flask_cors import CORS
import pymysql
import pymongo
import simplejson as json
import random
from datetime import datetime
from pymysql.err import (
    Warning as Warning,
    Error as Error,
    InterfaceError as InterfaceError,
    DataError as DataError,
    DatabaseError as DatabaseError,
    OperationalError as OperationalError,
    IntegrityError as IntegrityError,
    InternalError as InternalError,
    NotSupportedError as NotSupportedError,
    ProgrammingError as ProgrammingError,
    MySQLError as MySQLError,
)

app = Flask(__name__)
CORS(app)

#connect to mysql

conn = pymysql.connect(user='x86', host='localhost', passwd='x86x86', db='boba',cursorclass=pymysql.cursors.DictCursor)

#connect to mongodb
client = pymongo.MongoClient("mongodb+srv://x86:x86x86@boba-explorer-wmgsu.mongodb.net/test?retryWrites=true&w=majority")
db = client.test

db = client['Boba']
collection = db['BobaCollection']




@app.route('/')
def root():
    return 'SERVER ALIVE'

@app.route('/search', methods=['GET'])
def search():
    cur = conn.cursor()
    query = request.args.get('q')
    sql = "select Product.product_name,Product.product_id,Product.size,Product.price,Store.store_name,Store.location,Store.operation_time from Product left join Store on Store.store_id = Product.store_id where product_name like '%" + query + "%'"
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

    try:
        cur = conn.cursor()
        userid_sql = "select count(*) as cnt from user;"
        cur.execute(userid_sql)
        user_id = cur.fetchone()['cnt']
        cur.execute("insert into user(user_id, user_name, password, email) VALUES(%s,%s,%s,%s)", (int(user_id), str(username), str(password), str(email)))
        # commit to DB
        conn.commit()
        # close connection
        cur.close()

        return {'user_id':user_id, 'username':username}
    except InterfaceError:
        return {'err_msg':'Unable to register the user! --- Interface Error'}
    except DatabaseError:
        return {'err_msg':'Unable to register the user! --- Database Error'}
    except:
        return {'err_msg':'Unable to register the user!'}


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
    cur.execute("select count(*) as cnt from REVIEW_FROM_USER")
    review_id = cur.fetchone()['cnt']
    cur.execute("insert into REVIEW_FROM_USER(review_id, user_id, product_id, review_content) VALUES(%s,%s,%s,%s)", (review_id, str(uid), product_id, str(review_content)))
    conn.commit()
    cur.close()
    return {'review_id' : review_id}


@app.route('/update-review', methods=['POST'])
def update_review():
    req_body = request.json
    # uid = req_body['user_id']
    # product_id = req_body['product_id']
    update_review_content = req_body['review_content']
    review_id = req_body['review_id']

    try:
        cur = conn.cursor()
        cur.execute("update REVIEW_FROM_USER set review_content = %s where review_id = %s", (update_review_content, review_id))
        conn.commit()
        cur.close()
        return {'review_id':review_id, 'review_content':update_review_content}
    except InterfaceError:
        return {'err_msg':'Unable to update the review! --- Interface Error'}
    except DatabaseError:
        return {'err_msg':'Unable to update the review! --- Database Error'}
    except:
        return {'err_msg':'Unable to update the review!'}

@app.route('/delete-review', methods=['POST'])
def delete_review():
    req_body = request.json
    # uid = req_body['user_id']
    # product_id = req_body['product_id']
    review_id = req_body['review_id']

    try:
        cur = conn.cursor()
        cur.execute("delete from REVIEW_FROM_USER where review_id = %s", (review_id))
        conn.commit()
        cur.close()
        return {'review_id':review_id}
    except InterfaceError:
        return {'err_msg':'Unable to delete the review! --- Interface Error'}
    except DatabaseError:
        return {'err_msg':'Unable to delete the review! --- Database Error'}
    except:
        return {'err_msg':'Unable to delete the review!'}

@app.route('/fetch-review-user', methods=['POST'])
def fetch_review_user():
    req_body = request.json
    uid = req_body['user_id']

    cur = conn.cursor()
    sql = cur.execute("SELECT review_content FROM REVIEW_FROM_USER WHERE user_id = %s" ,(str(uid)))
    cur.execute(sql)
    datas = cur.fetchall()

    review_list = []
    for i in datas:
        review_list.append(i)
    return {'reviews' : review_list}

@app.route('/fetch-review', methods=['GET','POST'])
def fetch_review():

    cur = conn.cursor()
    cur.execute("SELECT * FROM REVIEW_FROM_USER")
    datas = cur.fetchall()

    return {'reviews' : datas}

"""
    Fetch all stores
"""
@app.route('/fetch-stores', methods=['GET'])
def fetch_stores():
    try:
        cur = conn.cursor()
        cur.execute("SELECT * FROM STORE")
        data = cur.fetchall()

        return {'stores' : data}
    except InterfaceError:
        return {'err_msg':'Unable to fetch stores! --- Interface Error'}
    except DatabaseError:
        return {'err_msg':'Unable to fetch stores! --- Database Error'}
    except:
        return {'err_msg':'Unable to fetch stores!'}
    finally:
        cur.close()

"""
    Fetch the store page info of <store_id>
"""
@app.route('/store/<int:store_id>', methods=['GET'])
def store(store_id):
    try:
        cur = conn.cursor()
        cur.execute("SELECT * FROM STORE WHERE store_id=%s", (store_id))
        store = cur.fetchall()
        if len(store) == 0: return {'err_msg':'Invalid Store ID!'}

        #TODO: May add more data fetching needed for store page display

        return {'store' : store[0]}
    except InterfaceError:
        return {'err_msg':'Unable to get store info! --- Interface Error'}
    except DatabaseError:
        return {'err_msg':'Unable to get store info! --- Database Error'}
    except:
        return {'err_msg':'Unable to get store info!'}
    finally:
        cur.close()
        
@app.route('/fetch_store_review')
def fetch_store_review() :
    req_body = request.json
    store_name = req_body['store_name']
    documents = collection.find({'Store' : store_name}, {'Comment' : 1, '_id' : 0})
    response = []
    for document in documents:
        for val, review in enumerate(document['Comment']) :
            response.append(review)
    return {store_name : response}



if __name__ == '__main__':
    app.run(debug=True)
