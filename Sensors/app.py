from flask import Flask
from flask_cors import CORS, cross_origin
from functions import *

app = Flask(__name__)

# cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/home')
@cross_origin()
def home():
    picName = "image.jpg"
    takePic(picName)
    savePic(picName)
    return "hello world 3"