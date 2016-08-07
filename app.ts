/// <reference path="typings/index.d.ts" />
/// <reference path="interfaces.ts" />

// Server modules
let express = require('express'),
    bodyParser = require('body-parser');
// App modules
let botResponseCallback = require('./bot/responses.js'),
    timesModule = require('./bot/times.js');

// Global HEX color generator
global['hexGenerator'] = function() {
    let letters = '0123456789ABCDEF'.split(''),
        color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// App logic
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', function (req, res) {
	res.status(200).send('<Bender> This house is mine!');
});
app.post('/slackBotTrigger', botResponseCallback);

// Error handler
app.use(function (err, req, res) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.use('/icons', express.static(__dirname + '/icons'));

app.listen(port, function () {
  console.log('Bender bot is running & listening port: ' + port);
});

timesModule();