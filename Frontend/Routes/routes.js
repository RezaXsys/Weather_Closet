const { log } = require("console");

module.exports = (app, client) => {
    app.get('/test',
        function (req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send('lol2');
        }
        
    );
};