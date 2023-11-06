const { log } = require("console");
var ObjectId = require('mongodb').ObjectId;

module.exports = (app, client) => {
    app.get('/',
        function (req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send('lol');
        }

    );

    app.get('/storeImageTest', function (req, res) {
        client.connect(function (err, cl) {
            if (err) throw err;
            const db = cl.db('ClothingStorage');
            db.collection("outfits").deleteMany({});
            for (i = 0; i < 5; i++) {
                db.collection("outfits").insertOne({
                    "img": '/asset/image' + i + '.jpg',
                    "weather": {
                        "temperature": 15,
                        "description": "Sunny",
                        "feelslike": 12,
                        "uv_index": 4,
                        "wind_speed": 10,
                        "precip": 0
                    },
                    "favorite": 0
                });
            }

        })
    });

    app.get('/getAllOutfits', function (req, res) {
        client.connect(function (err, cl) {
            if (err) throw err;
            const db = cl.db('ClothingStorage');
            db.collection("outfits").find({}).toArray((err, result) => {
                if (err) throw err;
                res.json(result);
            });
        })
    });

    app.get('/ngOutfit.js', function (req, res) {
        res.setHeader('Content-Type', 'application/javascript');
        res.sendFile(__dirname + '/js' + '/ngOutfit.js');
    });


};



