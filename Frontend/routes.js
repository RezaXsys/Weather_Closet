const { log } = require("console");

module.exports = (app, client) => {
    app.get('/Gallery',
        function (req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.sendFile(__dirname + '/views' + '/ngOutfit.html');
        }
    );
};