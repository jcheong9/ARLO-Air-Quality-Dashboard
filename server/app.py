from flask import Flask, jsonify, make_response,request
from flask_swagger_ui import get_swaggerui_blueprint
from flask_sqlalchemy import SQLAlchemy
import jwt
import datetime
from functools import wraps

app = Flask(__name__)
app.config['SECRET_KEY'] = 'thisissecret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:admin@localhost/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

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

##setup flask jwt
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.args.get('token') #http://127.0.0.1:5000/route?token=<token key>
        if not token:
            return jsonify({'message' : 'Token is missing!'}), 401
        try:
            data = jwt.decode(token,app.config['SECRET_KEY'])
        except:
            return jsonify({'message' : 'Token is invalid!'}), 401
        return f(*args, **kwargs)
    return decorated

class artist(db.Model):
    __tablename__ = 'artist'
    idartist = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    about = db.Column(db.String(100))
    imageurl = db.Column(db.String(200))

@app.route("/")
def home():
    return "<p>Hello World main page<p>"

@app.route("/page")
def page():
    return "<p>Hello World page!~~<p>"

@app.route("/artist", methods=['GET'])
def artistFun():
    artists = artist.query.all()

    output = []

    for art in artists:
        art_data = {}
        art_data['idartist'] = art.idartist
        art_data['name'] = art.name
        art_data['about'] = art.about
        art_data['imageurl'] = art.imageurl
        output.append(art_data)
    return jsonify({'artists' : output})

@app.route('/unprotected')
def unprotected():
    return jsonify({'message' : 'Anyone can see this!'})

@app.route('/protected')
@token_required
def protected():
    return jsonify({'message' : 'This only for people with valid token!'})

@app.route('/login')
def login():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
   
    if auth and auth.password == 'password':
        token = jwt.encode({'user': auth.username, 'exp': datetime.datetime.utcnow()+ datetime.timedelta(minutes=30)},app.config['SECRET_KEY'])
        return jsonify({'token' : token.decode('UTF-8')})

    return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

if __name__ == '__main__':
    app.run()