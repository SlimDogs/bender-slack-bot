(function () {
    var usersObj = new (require('../users/callback.js'))();
    var CodeReviewCommands = (function () {
        function CodeReviewCommands(callback, slackData) {
            this._callback = callback;
            this._slackData = slackData;
            this.respond();
        }
        CodeReviewCommands.prototype.respond = function () {
            var optionsString = this._slackData.messageTextUpperCase.replace('!codereview', '');
            var options = [];
            if (optionsString.length > 0 && optionsString.indexOf(' ') >= 0) {
                options = optionsString.split(' ');
            }
            var randomReviewer;
            if (options && options.length > 0) {
                var reviewerOptions = options.map(function (option) {
                    return {
                        name: option,
                        username: option.toLowerCase()
                    };
                });
                randomReviewer = reviewerOptions[Math.floor((Math.random() * (reviewerOptions.length - 1)) + 1)];
            }
            else {
                randomReviewer = usersObj.getCodeReviewer(this._slackData.userName);
            }
            this._callback("Oi, @" + this._slackData.userName + " needs someone for code review! I assign *" + randomReviewer.name + "* for this task, @" + randomReviewer.username + " be kind and spare a minute");
        };
        return CodeReviewCommands;
    }());
    module.exports = CodeReviewCommands;
})();