// Bot modules
var jokeModule = require('./joke/callback.js');
var weatherModule = require('./weather/callback.js');
var tflModule = require('./tfl/callback.js');

module.exports = function (req, res, next) {
  var slackData = {
    userName: req.body.user_name,
    triggerWord: req.body.trigger_word.replace('!','').toLowerCase(),
    messageText: req.body.text.toLowerCase()
  };

  // All responses
  var responses = {
      'joke': jokeModule,
      'time': function(callback) {
        var tempDate = new Date();
        callback('*' + slackData.userName + '*, current date is: ' + tempDate);
      },
      'weather': weatherModule,
      'tfl': tflModule,
      'hello': 'Hey there, dear *' + slackData.userName + '*!',
      'bug': 'Kill the bugs! Kill them *' + slackData.userName + '*!',
      'bender': 'Don\'t mention my name without serious reason! :P',
      'bot': 'Don\'t mention my name without serious reason! :P',
      'commands': '-- *This command is under construction* --'
  };

  var attachments = ['weather', 'tfl'];

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
      callbackFunction = function(attachmentObjectArray) {

        return res.status(200).json({
          attachments: attachmentObjectArray
        });

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