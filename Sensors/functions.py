import serial
import glob
import os
import pymongo
import requests, json

# RFID
# PortRF = serial.Serial('/dev/ttyAMA0',9600)
# ID = ""
# read_byte = PortRF.read()
# if read_byte==b"\x02":
#     for i in range(0,12):
#         read_byte = PortRF.read()
#         ID += read_byte.decode('utf-8')
#     print(ID)

# CAMERA


def takePic(picName):
    os.system(
        "raspistill -v -o /home/pi/Documents/Weather_Closet/Frontend/asset/" + picName)
    f = open("/home/pi/Documents/Weather_Closet/Frontend/asset/" +
             picName, "rb")  # 3.7kiB in same folder
    fileContent = f.read()
    byteArr = bytearray(fileContent)
    f.close()
    f = open("/home/pi/Documents/Weather_Closet/Frontend/asset/" + picName, "wb")
    f.write(byteArr)
    f.close()

# etu-web2.ut-capitole.fr if with raspberry, localhost if on computer


def savePic(picName, weather):
    client = pymongo.MongoClient("mongodb://etu-web2.ut-capitole.fr:27017/")
    db = client["ClothingStorage"]
    collection = db["outfits"]
    json = {
        "img": '/asset/' + picName,
        "city": "Toulouse",
        "weather": {
            "temperature": weather["main"]["temp"],
            "description": weather["weather"][0]["main"],
            "feelslike": weather["main"]["feels_like"],
            "wind_speed": weather["wind"]["speed"],
        },
        "favorite": 0,
        "user": 0,
    }
    print(collection.insert_one(json))

def weather():
    API_KEY = "f47eedb5435ca918b1ff4d802318da60"
    city = "Toulouse"
    url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + API_KEY
    response = requests.get(url)
    json = response.json()
    print(json["weather"][0]["main"])
    print(json["main"]["temp"])
    return json
