var jokeModule = require('./joke/callback.js');
var chucknorrisModule = require('./chucknorris/callback.js');
var weatherModule = require('./weather/callback.js');
var tflModule = require('./tfl/callback.js');
var timeModule = require('./time/callback.js');
var codeReviewModule = require('./codereview/callback.js');
var commandsModule = require('./commands/callback.js');
module.exports = function (req, res) {
    var slackData = {
        userName: req.body.user_name,
        triggerWord: req.body.trigger_word.replace('!', '').toLowerCase(),
        messageText: req.body.text.toLowerCase(),
        messageTextUpperCase: req.body.text
    };
    var responses = {
        'joke': jokeModule,
        'chucknorris': chucknorrisModule,
        'time': timeModule,
        'date': timeModule,
        'weather': weatherModule,
        'tfl': tflModule,
        'bender': 'Bite my shiny metal ass!',
        'bot': 'Bite my shiny metal ass!',
        'codereview': codeReviewModule,
        'commands': commandsModule
    };
    var attachments = ['joke', 'chucknorris', 'weather', 'tfl', 'time', 'date', 'commands'];
    if (slackData.userName !== 'slackbot') {
        var callbackFunction = void 0;
        if (attachments.indexOf(slackData.triggerWord) < 0) {
            callbackFunction = function (textString) {
                return res.status(200).json({
                    text: textString
                });
            };
        }
        else {
            callbackFunction = function (attachmentObjectArray, textString) {
                var responseObj = {
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
        }
        else {
            callbackFunction(responses[slackData.triggerWord]);
        }
    }
};