from flask import Flask
from flask_cors import CORS, cross_origin
from functions import *
from datetime import datetime

app = Flask(__name__)

# cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/takePicture')
@cross_origin()
def takePicture():
    picName = str(datetime.now().strftime('%Y-%m-%d-%H:%M:%S')) + ".jpg"
    print(picName)
    takePic(picName)
    savePic(picName)
    return "Picture taken"
