from flask import Flask, render_template, request, redirect, url_for, jsonify, Response, json
import pymongo
from flask_cors import CORS
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
from bson.objectid import ObjectId
from bson import json_util

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this "super secret" with something else!
jwt = JWTManager(app)

CORS(app)

client = pymongo.MongoClient("mongodb://admin:sonu66%40SURYA@thegifttown.in:27017/")
db = client.FlaskBlogProject

@app.route('/')
def index():

    return "Test"

@app.route('/post-blog', methods=['POST'])
@jwt_required()
def post_blog():
    id = get_jwt_identity()
    user = db.blogusers.find_one({'_id': ObjectId(id)})

    db.blogs.insert_one({'title': request.form.get('title'), 'description': request.form.get('description'), 'id': id})

    return "Success"

@app.route('/get-blog', methods=['GET'])
def get_blog():
    blogs = db.blogs.find({})
    blogslist = list(blogs)
    print(blogslist)
    # for document in blogs:
    #       print(document)     
    # return jsonify({'blogs':blogslist})
    return json_util.dumps(blogslist)

@app.route('/signup', methods=['POST'])
def sign_up():
    try:
        db.blogusers.insert_one({'username': request.form.get('username'), 'email': request.form.get('email'), 'password': request.form.get('password')})
        return "Success"
    except:
        return "Fail"

@app.route('/login', methods=['POST'])
def login():
        user = db.blogusers.find_one({'username': request.form.get('username')})
        if(user):
            if(user['password'] == request.form.get('password')):
                token = create_access_token(str(db.blogusers.find_one({'username': request.form.get('username')})['_id']))
                return jsonify({"status": 'success', "token": token})
            else:
                return jsonify({"status": 'error', "message": "Wrong Password"})
        else:
            return jsonify({"status": 'error', "message": "User Not Found"})

if __name__ == '__main__':
    app.run(debug=True)