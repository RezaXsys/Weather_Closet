import serial
import glob
import os
import pymongo

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


def savePic(picName):
    client = pymongo.MongoClient("mongodb://etu-web2.ut-capitole.fr:27017/")
    db = client["ClothingStorage"]
    collection = db["outfits"]
    json = {
        "img": '/asset/' + picName,
        "city": "Toulouse",
        "weather": {
            "temperature": 15,
            "description": "Sunny",
            "feelslike": 12,
            "uv_index": 4,
            "wind_speed": 10,
            "precip": 0
        },
        "favorite": 0,
        "user": 0,
    }
    print(collection.insert_one(json))
