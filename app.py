from flask import Flask
from flask_swagger_ui import get_swaggerui_blueprint


app = Flask(__name__)


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


@app.route("/")
def home():
    return "<p>Hello World main page<p>"

if __name__ == '__main__':
    app.run()