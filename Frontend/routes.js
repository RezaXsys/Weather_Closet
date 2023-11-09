const { log } = require("console");
const request = require("request");
module.exports = (app, client) => {
  const API_KEY = "f47eedb5435ca918b1ff4d802318da60";

  // Default display
  app.get("/", function (req, res) {
    res.render("index", { weather: null, error: null });
  });

  //Open Weather App

  app.post("/", function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    let weather; // Declare weather variable here
    let weatherFahrenheit; // Declare weatherFahrenheit here

    // Request for data using the url
    request(url, function (err, response, body) {
      // Error message
      if (err) {
        res.render("index", {
          weather: null,
          error: "Error, please tray again",
        });
      } else {
        weather = JSON.parse(body);

        console.log(weather);
        // get it in python
        if (weather.main == undefined) {
          res.render("index", {
            weather: null,
            error: "Error, please try agian",
          });
        } else {
          let place = `${weather.name}, ${weather.sys.country}`;

          let weatherTimezone = `${new Date(
            weather.dt * 1000 - weather.timezone * 1000
          )}`;
          let weatherTemp = `${weather.main.temp}`,
            weatherPressure = `${weather.main.pressure}`,
            /* fetch the weather con and its size using the icon data */
            weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
            weatherDescription = `${weather.weather[0].description}`,
            humidity = `${weather.main.humidity}`,
            clouds = `${weather.clouds.all}`,
            visibility = `${weather.visibility}`,
            main = `${weather.weather[0].main}`;
          weatherFahrenheit = (weatherTemp * 9) / 5 + 32;
          weatherFahrenheit = roundToTwo(weatherFahrenheit);
          // you shall also round off the value of the degrees fahrenheit calculated into two decimal places

          function roundToTwo(num) {
            return +(Math.round(num + "e+2") + "e-2");
          }
          //let weather = JSON.parse(body);

          client.connect(function (err, cl) {
            if (err) throw err;
            const db = cl.db("ClothingStorage");
            query = {
              "weather.description": weather["weather"][0]["main"],
              "weather.temperature": {
                $gt: weather["main"]["temp"] - 2,
                $lt: weather["main"]["temp"] + 2,
              },
            };
            db.collection("outfits")
              .find(query)
              .toArray((err, result) => {
                if (err) throw err;
                let imagePathFromDatabase = "/default/path/to/image.jpg";

                // Assuming result is an array of documents from the "outfits" collection
                // and each document has a field called "imagePath"
                if (result.length > 0 && result[0].img) {
                  imagePathFromDatabase = result[0].img;
                }

                res.render("index", {
                  weather: weather,
                  place: place,
                  temp: weatherTemp,
                  pressure: weatherPressure,
                  icon: weatherIcon,
                  description: weatherDescription,
                  timezone: weatherTimezone,
                  humidity: humidity,
                  fahrenheit: weatherFahrenheit,
                  clouds: clouds,
                  visibility: visibility,
                  main: main,
                  error: null,
                  imagePathFromDatabase: imagePathFromDatabase,
                });
              });
          });
        }
      }
    });
  });

  app.get("/test", function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.sendFile(__dirname + "/views" + "/ngOutfit.html");
  });

  app.get("/Gallery", function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.sendFile(__dirname + "/views" + "/gallery.html");
  });

  app.get("/About", function (req, res) {
    res.render("about2.ejs");
  });

  app.get("/Index", function (req, res) {
    res.render("index.ejs", { weather: null, error: null });
  });
};
