const { log } = require("console");

module.exports = (app, client) => {
    app.get('/test',
        function (req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.sendFile(__dirname + '/views' + '/ngOutfit.html');
        }
    );

    app.get('/css',
        function (req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.sendFile(__dirname + '/asset/css/style.css');
        }
    );

    app.get('/Gallery',
        function (req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.sendFile(__dirname + '/views' + '/gallery.html');
        }
    );
};