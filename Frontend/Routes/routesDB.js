const { log } = require("console");

module.exports = (app, client) => {
    app.get('/',
        function (req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send('lol');
        }
        
    );
};