/*
Require application dependencies
These are express, body-parser and request
*/

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

// Configure dotenv packagae
require("dotenv").config();

// API  KEY

const apiKey = "${process.env.API_KEY}";

// view engine

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Setup default display on launch
app.get("/", function (req, res) {
  res.render("index", { weather: null, error: null });
});

// On a post request, the app shall data from OpenWeatherMap using the given arguemnst
app.post("/", function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  // Request for data using the url
  request(url, function (err, response, body) {
    // Error message
    if (err) {
      res.render("index", { weather: null, error: "Error, please tray again" });
    } else {
      let weather = JSON.parse(body);

      console.log(weather);
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

        res.render("index", {
          weather: weather,
          place: place,
          weatherTimezone: weatherTimezone,
          error: null,
        });
      }
    }
  });

  // output it in the console just to make sure it works

  // render the data to your page (index.ejs) before displaying it out
});
