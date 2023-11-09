const { log } = require("console");
const request = require("request");
var ObjectId = require("mongodb").ObjectId;

module.exports = (app, client) => {
  const API_KEY = "f47eedb5435ca918b1ff4d802318da60";

  app.get("/storeImageTest", function (req, res) {
    client.connect(function (err, cl) {
      if (err) throw err;
      const db = cl.db("ClothingStorage");
      db.collection("outfits").deleteMany({});
      for (i = 0; i < 5; i++) {
        db.collection("outfits").insertOne({
          img: "/asset/image" + i + ".jpg",
          weather: {
            temperature: 15,
            description: "Sunny",
            feelslike: 12,
            wind_speed: 10,
          },
          favorite: 0,
          user: 0,
        });
      }
      db.collection("outfits").insertOne({
        img: "/asset/image.jpg",
        weather: {
          temperature: 15,
          description: "Sunny",
          feelslike: 12,
          wind_speed: 10,
        },
        favorite: 0,
        user: 0,
      });
    });
  });

  app.get("/getAllOutfits", function (req, res) {
    client.connect(function (err, cl) {
      if (err) throw err;
      const db = cl.db("ClothingStorage");
      db.collection("outfits")
        .find({})
        .toArray((err, result) => {
          if (err) throw err;
          res.json(result);
        });
    });
  });

  app.get("/getWeatherOutfits", function (req, res) {
    let city = "Toulouse";
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    // Request for data using the url
    request(url, function (err, response, body) {
      // Error message
      if (err) {
        res.render("index", {
          weather: null,
          error: "Error, please tray again",
        });
      } else {
        let weather = JSON.parse(body);
        console.log(weather["weather"][0]["main"]);
        client.connect(function (err, cl) {
          if (err) throw err;
          const db = cl.db("ClothingStorage");
          query = {
            weather: {
              description: "Clouds",
              // "temperature": { $gt: `${weather.main.temp}` - 2, $lt: `${weather.main.temp}` + 2 }
            },
          };
          db.collection("outfits")
            .find(query)
            .toArray((err, result) => {
              if (err) throw err;
              console.log("Query Result:", result); // Add this line

              res.json(result);
            });
        });
      }
    });
  });

  app.get("/ngOutfit.js", function (req, res) {
    res.setHeader("Content-Type", "application/javascript");
    res.sendFile(__dirname + "/js" + "/ngOutfit.js");
  });
};
