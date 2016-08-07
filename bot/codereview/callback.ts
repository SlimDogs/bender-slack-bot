/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../interfaces.ts" />

let usersObj = require('../users/callback.js');

module.exports = function(callback, slackData: slackOpts) {

    let restOftheMessage = slackData.messageTextUpperCase.replace('!codereview', ''),
        options;

    if (restOftheMessage.length > 0 && restOftheMessage.indexOf(' ') >= 0) {
        options = restOftheMessage.split(' ');
    }

    let randomReviewer: user;
    if (options && options.length > 0) {
        let givenReviewerOptions = [];

        for (let i = 0, b = options.length; i < b; i++) {
            givenReviewerOptions.push({
                name: options[i],
                username: options[i].toLowerCase()
            });
        }

        randomReviewer = givenReviewerOptions[Math.floor((Math.random() * (givenReviewerOptions.length - 1)) + 1)];
    }
    else {
        randomReviewer = usersObj.getCodeReviewer(slackData.userName);
    }

    callback("Oi, @" + slackData.userName + " needs someone for code review! I assign *" + randomReviewer.name + "* for this task, @" + randomReviewer.username + " be kind and spare a minute");
};