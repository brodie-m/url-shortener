
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson import json_util
import json
from flask_cors import CORS
import algo

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"]='mongodb+srv://dbAdmin:RCvlYaA2ZxKxvW5s@cluster0.0gvw8.mongodb.net/db_one?ssl=true&ssl_cert_reqs=CERT_NONE'
mongo = PyMongo(app)


@app.route('/')
def index():
    return '<h1>Hello world</h1>'

@app.route('/addurl', methods=['GET','POST'])
def shorten():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        url = data['url']
        new_obj = algo.shorten_url(url)
        result = mongo.db.urls.find_one({"id":new_obj['id']})
        if result:
            return parse_json(result),201
        else :
            mongo.db.urls.save(new_obj)
            return parse_json(new_obj), 201
    #redirect to url in object

@app.route('/findurl',methods=['GET','POST'])
def find_url():
    data = request.get_json()
    print(data)
    result = mongo.db.urls.find_one({"id": data['id']})
    print(result)
    return parse_json(result),201

def parse_json(data):
    return json.loads(json_util.dumps(data))
