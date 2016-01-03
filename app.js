// Server modules
var express = require('express');
var bodyParser = require('body-parser');
// App modules
var botResponseCallback = require('./bot/responses.js');
var timesModule = require('./bot/times.js');

// Global HEX color generator
GLOBAL.hexGenerator = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// App logic
var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', function (req, res) { res.status(200).send('<Bender> This house is mine!') });
app.post('/slackBotTrigger', botResponseCallback);

// Error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.use("/icons", express.static(__dirname + '/icons'))

app.listen(port, function () {
  console.log('Bender bot is running & listening port: ' + port);
});

timesModule();