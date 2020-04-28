from flask import Flask, jsonify, make_response, request
from flask_swagger_ui import get_swaggerui_blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

import os
import jwt
import datetime
from functools import wraps

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
# Authorization
app.config['SECRET_KEY'] = 'thisissecret'

# Database

# 'postgresql://username:password@hostname/database'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://hceigsjprcvgqh:e92da4353d4ee7c91de8d35e7279c3048b4bc1bab6bbc5dc854a2e0a12f4d933@ec2-23-22-156-110.compute-1.amazonaws.com/dbjr6ju1135sb7'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Zh6Q6C97@database-issp-air-quality-instance.cmamvcvbojfv.us-west-2.rds.amazonaws.com/airQualityApiDb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Init db
db = SQLAlchemy(app)

# Init ma
ma = Marshmallow(app)


### swagger specific ###
SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "ARLO-Air-Quality-API"
    }
)
app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)
### end swagger specific ###

# setup flask jwt


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # http://127.0.0.1:5000/route?token=<token key>
        token = request.args.get('token')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
        return f(*args, **kwargs)
    return decorated


# class file should be in different file
class Test_object(db.Model):
    __tablename__ = 'message'
    convid = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(1024))
    timestamp = db.Column(db.DateTime)
    senderid = db.Column(db.Integer)

    

####


@app.route("/test_obj", methods=['GET'])
def test_obj():
    testdata = Test_object.query.all()
    output = []
    for i in testdata:
        obj = {}
        obj['convid'] = i.convid
        obj['content'] = i.content
        obj['timestamp'] = i.timestamp
        obj['senderid'] = i.senderid
        output.append(obj)
    return jsonify({'test_data': output})


@app.route("/test_obj", methods=['POST'])
def add_test_obj():

    data = request.get_json()
    new_entry = Test_object(convid=data['convid'], content=data['content'], timestamp=data['timestamp'],senderid=data['senderid'])
    # convid = request.json['convid']
    # content = request.json['content']
    # timestamp = request.json['timestamp']
    # senderid = request.json['senderid']

    # new_msg_obj = Test_object(convid, content, timestamp, senderid)

    # db.session.add(new_msg_obj)

    db.session.add(new_entry)
    db.session.commit()

    return jsonify(new_entry)


# ## Create records_test object
# class Records_test(db.Model):
#     __tablename__ = 'records_test'
#     record_id = db.Column(db.Integer, primary_key=True)
#     device_id = db.Column(db.String(100))
#     temp = db.Column(db.Float)
#     humidity = db.Column(db.Float)
#     co2 = db.Column(db.Float)
#     tvoc = db.Column(db.Float)
#     timestamp = db.Column(db.DateTime(timezone=True))

#     def __init__(self, record_id, device_id, temp, humidity, co2, tvoc, timestamp):
#         self.record_id = record_id
#         self.device_id = device_id
#         self.temp = temp
#         self.humidity = humidity
#         self.co2 = co2
#         self.tvoc = tvoc
#         self.timestamp = timestamp


# @app.route("/records_test", methods=['GET'])
# def records_test():
#     recordsTestData = Records_test.query.all()
#     output = []

#     for i in recordsTestData:
#         records_test_data = {}
#         records_test_data['record_id'] = i.record_id
#         records_test_data['device_id'] = i.device_id
#         records_test_data['temp'] = i.temp
#         records_test_data['humidity'] = i.humidity
#         records_test_data['co2'] = i.co2
#         records_test_data['tvoc'] = i.tvoc
#         records_test_data['timestamp'] = i.timestamp
#         output.append(records_test_data)
#     return jsonify({'records_test_data' : output})


@app.route("/", methods=['GET'])
def get():
    return jsonify({'msg': 'Hello World'})


@app.route("/page")
def page():
    return "<p>Hello World page!~~<p>"


@app.route('/unprotected')
def unprotected():
    return jsonify({'message': 'Anyone can see this!'})


@app.route('/protected')
@token_required
def protected():
    return jsonify({'message': 'This only for people with valid token!'})


@app.route('/login')
def login():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    if auth and auth.password == 'password':
        token = jwt.encode({'user': auth.username, 'exp': datetime.datetime.utcnow(
        ) + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
        return jsonify({'token': token.decode('UTF-8')})

    return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})


if __name__ == '__main__':
    app.run(debug=True)
