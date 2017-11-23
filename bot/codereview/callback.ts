/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../interfaces.ts" />

(() => {
  const usersObj = new (require('../users/callback.js'))();

  class CodeReviewCommands {
    private _callback: Function;
    private _slackData: slackOpts;

    constructor(callback: Function, slackData: slackOpts) {
      this._callback = callback;
      this._slackData = slackData;

      this.respond();
    }

    public respond() {
      const optionsString = this._slackData.messageTextUpperCase.replace('!codereview', '');

      let options = [];
      if (optionsString.length > 0 && optionsString.indexOf(' ') >= 0) {
        options = optionsString.split(' ');
      }

      let randomReviewer;
      if (options && options.length > 0) {
        const reviewerOptions = options.map(option => {
          return {
            name: option,
            username: option.toLowerCase()
          }
        });

        randomReviewer = reviewerOptions[Math.floor((Math.random() * (reviewerOptions.length - 1)) + 1)];
      }
      else {
        randomReviewer = usersObj.getCodeReviewer(this._slackData.userName);
      }

      this._callback(
        `Oi, @${this._slackData.userName} needs someone for code review! I assign *${randomReviewer.name}* for this task, @${randomReviewer.username} be kind and spare a minute`
      );
    }
  }

  module.exports = CodeReviewCommands;
})();
