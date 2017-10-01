/// <reference path="typings/index.d.ts" />
/// <reference path="interfaces.ts" />

// Server modules
const express = require('express');
const bodyParser = require('body-parser');

// App modules
const botResponseCallback = require('./bot/responses.js');
const chronTaskRunner = require('./bot/chron-task-runner.js');

// Global HEX color generator
global['hexGenerator'] = function () {
  const letters = '0123456789ABCDEF'.split('');

  let color = '#';
  for (let i = 0; i < 6; i++) {
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
app.use(function (err, req, res, next) {
  console.log('err', err, 'res', res);
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.use('/icons', express.static(`${__dirname}/icons`));

app.listen(port, function () {
  console.log(`Bender bot is running & listening port: ${port}`);
});

const startTasks = new chronTaskRunner();