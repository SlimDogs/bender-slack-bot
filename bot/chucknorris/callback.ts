/// <reference path="../../typings/index.d.ts" />

(() => {
  const http = require('http');

  class ChuckNorrisCommands {
    private _callback: Function;

    constructor(callback: Function) {
      this._callback = callback;

      this.respond();
    }

    public respond() {
      const _self = this;
      http.get({
        host: 'api.icndb.com',
        path: '/jokes/random'
      }, function (res) {
        let body = '';
        res.on('data', function (d) {
          body += d;
        });
        res.on('end', function () {
          const jokeObj = JSON.parse(body);
          _self._callback([{
            "color": global['hexGenerator'](),
            "title": jokeObj.value.joke,
            "image_url": 'http://benderthebot.herokuapp.com/icons/chucknorris.png'
          }]);
        });
      });
    }
  }

  module.exports = ChuckNorrisCommands;
})();
