var express = require('express');
var bodyParser = require('body-parser');
var botResponseCallback = require('./bot/responses.js');
var chronTaskRunner = require('./bot/chron-task-runner.js');
global['hexGenerator'] = function () {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};
var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.status(200).send('<Bender> This house is mine!');
});
app.post('/slackBotTrigger', botResponseCallback);
app.use(function (err, req, res) {
    console.error(err.stack);
    res.status(400).send(err.message);
});
app.use('/icons', express.static(__dirname + "/icons"));
app.listen(port, function () {
    console.log("Bender bot is running & listening port: " + port);
});
var startTasks = new chronTaskRunner();