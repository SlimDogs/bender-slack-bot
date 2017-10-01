/// <reference path="../../typings/index.d.ts" />

(() => {
  const moment = require('moment-timezone');
  
  class TimeCommands {
    private _callback: Function;
  
    get months() {
      return [
        'January', 'February', 'March',
        'April', 'May', 'June',
        'July', 'August', 'September',
        'October', 'November', 'December'
      ];
    }
  
    constructor(callback: Function) {
      this._callback = callback;
  
      this.repsond();
    }
  
    public repsond() {
      const londonDate = new Date();
      const lvivDate = moment.tz(londonDate, 'Europe/Kiev');
  
      this._callback([{
          "color": global['hexGenerator'](),
          "fields": [
            {
              "title": 'London (GB)',
              "value": this._padNumber(londonDate.getDate()) + ' ' + this.months[londonDate.getMonth()] + ' ' + londonDate.getFullYear() + ', ' + this._padNumber(londonDate.getHours()) + ':' + this._padNumber(londonDate.getMinutes()),
              "short": true
            },
            {
              "title": 'Lviv (UKR)',
              "value": this._padNumber(lvivDate.getDate()) + ' ' + this.months[lvivDate.getMonth()] + ' ' + lvivDate.getFullYear() + ', ' + this._padNumber(lvivDate.getHours()) + ':' + this._padNumber(lvivDate.getMinutes()),
              "short": true
            }
          ],
          "image_url": 'http://benderthebot.herokuapp.com/icons/time.png'
      }]);
    }
  
    private _padNumber(digit: number) {
      return (digit < 10 ? '0' : '') + digit;
    }
  }
  
  module.exports = TimeCommands;  
})();
