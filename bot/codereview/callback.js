/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../interfaces.ts" />
var users = require('../users/callback.js');
module.exports = function (callback, slackData) {
    var restOftheMessage = slackData.messageTextUpperCase.replace('!codereview', ''), options;
    if (restOftheMessage.length > 0 && restOftheMessage.indexOf(' ') >= 0) {
        options = restOftheMessage.split(' ');
    }
    var randomReviewer;
    if (options && options.length > 0) {
        var givenReviewerOptions = [];
        for (var i = 0, b = options.length; i < b; i++) {
            givenReviewerOptions.push({
                name: options[i],
                username: options[i].toLowerCase()
            });
        }
        randomReviewer = givenReviewerOptions[Math.floor((Math.random() * (givenReviewerOptions.length - 1)) + 1)];
    }
    else {
        randomReviewer = users.getCodeReviewer(slackData.userName);
    }
    callback("Oi, @" + slackData.userName + " needs someone for code review! I assign *" + randomReviewer.name + "* for this task, @" + randomReviewer.username + " be kind and spare a minute");
};
