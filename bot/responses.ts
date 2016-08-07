/// <reference path="../typings/index.d.ts" />
/// <reference path="../interfaces.ts" />

// Bot modules
let jokeModule = require('./joke/callback.js'),
    chucknorrisModule = require('./chucknorris/callback.js'),
    weatherModule = require('./weather/callback.js'),
    tflModule = require('./tfl/callback.js'),
    timeModule = require('./time/callback.js'),
    codeReviewModule = require('./codereview/callback.js'),
    commandsModule = require('./commands/callback.js'),
    paoloModule = require('./paolo/callback.js');

module.exports = function(req, res) {
    let slackData: slackOpts = {
        userName: req.body.user_name,
        triggerWord: req.body.trigger_word.replace('!', '').toLowerCase(),
        messageText: req.body.text.toLowerCase(),
        messageTextUpperCase: req.body.text
    };

    // All responses
    let responses = {
        // Fun
        'joke': jokeModule,
        'chucknorris': chucknorrisModule,
        // Useful
        'time': timeModule,
        'date': timeModule,
        'weather': weatherModule,
        'tfl': tflModule,
        // Humanize
        //'hello': 'Hey there, dear *' + slackData.userName + '*!',
        //'bug': 'Kill the bugs! Kill them *' + slackData.userName + '*!',
        'bender': 'Bite my shiny metal ass!',
        'bot': 'Bite my shiny metal ass!',
        'codereview': codeReviewModule,
        'paolo': paoloModule,
        // Help
        'commands': commandsModule
    };

    var attachments = ['joke', 'chucknorris', 'weather', 'tfl', 'time', 'date', 'commands'];

    // avoid infinite loop
    if (slackData.userName !== 'slackbot') {
        var callbackFunction;

        if (attachments.indexOf(slackData.triggerWord) < 0) {
            callbackFunction = function(textString) {

                return res.status(200).json({
                    text: textString
                });

            };
        } else {
            callbackFunction = function(attachmentObjectArray, textString) {
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

        if (typeof responses[slackData.triggerWord] === 'function') {
            responses[slackData.triggerWord](callbackFunction, slackData);
        } else {
            callbackFunction(responses[slackData.triggerWord]);
        }
    }
};