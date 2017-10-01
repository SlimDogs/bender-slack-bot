/// <reference path="../typings/index.d.ts" />
/// <reference path="../interfaces.ts" />

// Bot modules
const jokeModule = require('./joke/callback.js');
const chucknorrisModule = require('./chucknorris/callback.js');
const weatherModule = require('./weather/callback.js');
const tflModule = require('./tfl/callback.js');
const timeModule = require('./time/callback.js');
const codeReviewModule = require('./codereview/callback.js');
const commandsModule = require('./commands/callback.js');

module.exports = function (req, res) {
  let slackData: slackOpts = {
    userName: req.body.user_name,
    triggerWord: req.body.trigger_word.replace('!', '').toLowerCase(),
    messageText: req.body.text.toLowerCase(),
    messageTextUpperCase: req.body.text
  };

  // All responses
  const responses = {
    // Fun
    'joke': jokeModule,
    'chucknorris': chucknorrisModule,
    // Useful
    'time': timeModule,
    'date': timeModule,
    'weather': weatherModule,
    'tfl': tflModule,
    // Humanize
    'bender': 'Bite my shiny metal ass!',
    'bot': 'Bite my shiny metal ass!',
    'codereview': codeReviewModule,
    // Help
    'commands': commandsModule
  };

  const attachments = ['joke', 'chucknorris', 'weather', 'tfl', 'time', 'date', 'commands'];

  // avoid infinite loop
  if (slackData.userName !== 'slackbot') {
    let callbackFunction;

    if (attachments.indexOf(slackData.triggerWord) < 0) {
      callbackFunction = function (textString) {

        return res.status(200).json({
          text: textString
        });

      };
    } else {
      callbackFunction = function (attachmentObjectArray, textString) {
        const responseObj = {
          attachments: attachmentObjectArray,
          text: null
        };

        if (textString) {
          responseObj.text = textString;
        }

        return res.status(200).json(responseObj);
      };
    }

    if (typeof responses[slackData.triggerWord] !== 'string') {
      new responses[slackData.triggerWord](callbackFunction, slackData);
    } else {
      callbackFunction(responses[slackData.triggerWord]);
    }
  }
};