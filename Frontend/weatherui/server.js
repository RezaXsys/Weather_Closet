/*
Require application dependencies
These are express, body-parser and request
*/
const images = [
  {
    url: "Frontend/asset/weatherui/Assets/clear.png",
    alt: "Image 1",
    caption: "A beautiful sunset",
  },
  {
    url: "Frontend/asset/weatherui/Assets/drizzle.png",
    alt: "Image 2",
    caption: "Snowy mountains",
  },
  {
    url: "Frontend/asset/weatherui/Assets/snow.png",
    alt: "Image 3",
    caption: "City lights",
  },
];
/**
 * TODO 1: make picture card at front end
 * 2: connect with other page
 * 3: Image Gallery to nav bar
 */
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const API_KEY = "f47eedb5435ca918b1ff4d802318da60";

// Configure dotenv packagae
require("dotenv").config();
app.use(express.static("public"));
// API  KEY

const apiKey = "${process.env.API_KEY}";

// view engine
app.use(express.static(__dirname + "/Frontend/weatherui/views"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.listen(5000, function () {
  console.log("Weather app listening on port 5000!");
});

// Setup default display on launch

app.get("/", function (req, res) {
  res.render("index", { weather: null, error: null });
});

// On a post request, the app shall data from OpenWeatherMap using the given arguemnst
app.post("/", function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  // Request for data using the url
  request(url, function (err, response, body) {
    // Error message
    if (err) {
      res.render("index", { weather: null, error: "Error, please tray again" });
    } else {
      let weather = JSON.parse(body);

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
          main = `${weather.weather[0].main}`,
          weatherFahrenheit;
        weatherFahrenheit = (weatherTemp * 9) / 5 + 32;
        // you shall also round off the value of the degrees fahrenheit calculated into two decimal places

        function roundToTwo(num) {
          return +(Math.round(num + "e+2") + "e-2");
        }
        weatherFahrenheit = roundToTwo(weatherFahrenheit);
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
        });
      }
    }
  });
});
app.get("/Gallery", function (req, res) {
  res.render("gallery.ejs", { images });
});
//signin page: 127.0.0.1:10002/signin
app.get("/About", function (req, res) {
  res.render("about.ejs");
});
