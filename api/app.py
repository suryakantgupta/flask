from flask import Flask, render_template, request, redirect, url_for
import pymongo

app = Flask(__name__)

client = pymongo.MongoClient("mongodb://admin:sonu66%40SURYA@thegifttown.in:27017/")
db = client.theGifttownAppDB

@app.route('/')
def index():

    return "Test"

@app.route('/post-blog', methods=['POST'])
def post_blog():

    db.blogs.insert_one({'title': request.form.get('title'), 'description': request.form.get('description')})

    return "Test"

if __name__ == '__main__':
    app.run(debug=True)