let express = require("express");
var path = require("path");
const bodyParser = require("body-parser");
const request = require("request");
let app = express();
let port = 3010;
const API_KEY = "f47eedb5435ca918b1ff4d802318da60";

// Theresa

require("dotenv").config();
app.use(express.static("public"));
//app.use(express.static(path.join(__dirname + "/Frontend/asset")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//-----

const MongoClient = require("mongodb/lib/mongo_client");
const mongoClient = require("mongodb").MongoClient;
// etu-web2.ut-capitole.fr if with raspberry, localhost if on computer
let client = new MongoClient(
  "mongodb://etu-web2.ut-capitole.fr:27017/ClothingStorage"
);

client.connect(function (err, cl) {
  if (err) throw err;
  const db = cl.db("ClothingStorage");
  console.log("Connected!");
});

//app.use(express.static("Frontend"));

//load routes: define controller which act on db
let routesDB = require("./routesDB.js");
routesDB(app, client);

let routes = require("./routes.js");
routes(app, client);

// run server
//port 3010
app.listen(port);

/*
app.listen(5000, function () {
  console.log("Weather app listening on port 5000!");
});
*/
