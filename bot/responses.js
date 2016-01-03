// Bot modules
var jokeModule = require('./joke/callback.js');
var chucknorrisModule = require('./chucknorris/callback.js');
var weatherModule = require('./weather/callback.js');
var tflModule = require('./tfl/callback.js');
var timeModule = require('./time/callback.js');
var commandsModule = require('./commands/callback.js');

module.exports = function (req, res, next) {
  var slackData = {
    userName: req.body.user_name,
    triggerWord: req.body.trigger_word.replace('!','').toLowerCase(),
    messageText: req.body.text.toLowerCase()
  };

  // All responses
  var responses = {
      // Fun
      'joke': jokeModule,
      'chucknorris': chucknorrisModule,
      // Useful
      'time': timeModule,
      'date': timeModule,
      'weather': weatherModule,
      'tfl': tflModule,
      // Humanize
      'hello': 'Hey there, dear *' + slackData.userName + '*!',
      'bug': 'Kill the bugs! Kill them *' + slackData.userName + '*!',
      'bender': 'Don\'t mention my name without serious reason! :P',
      'bot': 'Don\'t mention my name without serious reason! :P',
      // Help
      'commands': commandsModule
  };

  var attachments = ['joke', 'chucknorris', 'weather', 'tfl', 'time', 'commands'];

  // avoid infinite loop
  if (slackData.userName !== 'slackbot') {
    var callbackFunction;

    if (attachments.indexOf(slackData.triggerWord) < 0) {
      callbackFunction = function(textString) {

        return res.status(200).json({
          text: textString
        });

      };
    }
    else {
      callbackFunction = function(attachmentObjectArray, textString) {
        var responseObj = {
          attachments: attachmentObjectArray
        };

        if (textString != null) {
          responseObj.text = textString;
        }

        return res.status(200).json(responseObj);

      };
    }

    if (typeof responses[slackData.triggerWord] === 'function') {
      responses[slackData.triggerWord](callbackFunction, slackData);
    }
    else {
      callbackFunction(responses[slackData.triggerWord]);
    }
  }
};