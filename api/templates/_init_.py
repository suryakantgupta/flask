from flask import Flask j

from .extensions import mongo

def create_app():
    app= Flask(_name_)

    app.config['Mongo_URI'] = 'mongodb+srv://Tejashree:Tejashree23@cluster0.jxvdd,mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


    mongo.init_app(app)

    return app