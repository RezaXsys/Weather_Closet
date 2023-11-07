let express = require('express');
let app = express();
let port = 3010;

const MongoClient = require('mongodb/lib/mongo_client');
const mongoClient = require('mongodb').MongoClient;
// etu-web2.ut-capitole.fr if with raspberry, localhost if on computer
let client = new MongoClient('mongodb://etu-web2.ut-capitole.fr:27017/ClothingStorage');

client.connect(function (err, cl) {
    if (err) throw err;
    const db = cl.db('ClothingStorage');
    console.log('Connected!');
});

app.use(express.static('Frontend'));

//load routes: define controller which act on db
let routesDB = require('./routesDB.js');
routesDB(app, client);

let routes = require('./routes.js');
routes(app, client)

// run server  
app.listen(port);
