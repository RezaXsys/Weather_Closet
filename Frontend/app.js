let express = require('express');
let app = express();
let port = 3010;

const MongoClient = require('mongodb/lib/mongo_client');
const mongoClient = require('mongodb').MongoClient;
let client = new MongoClient('mongodb://localhost:27017/ClothingStorage');

client.connect( function(err, cl) {
    if (err) throw err;
    const db = cl.db('ClothingStorage');
    console.log('Connected!');
});

// load routes: define controller which act on db
let routesDB = require('./Routes/routesDB.js');
routesDB(app, client);

let routes = require('./Routes/routes.js');
routes(app, client)

// run server  
app.listen(port);
