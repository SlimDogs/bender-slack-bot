/// <reference path="../../typings/index.d.ts" />

(function() {

    'use strict';

    const time = require('time');
    let monthNames: Array<string> = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    function normalizeNumber(digit: number): string {
      return (digit < 10 ? '0' : '') + digit;
    }

  let timeResponseFunction = function (callback/*, slackData*/) {

    let londonDate: Date = new Date(),
        lvivDate = new time.Date();

    lvivDate.setTimezone('Europe/Kiev');

    callback([{
        "color": global['hexGenerator'](),
        "fields": [
          {
            "title": 'London (GB)',
            "value": normalizeNumber(londonDate.getDate()) + ' ' + monthNames[londonDate.getMonth()] + ' ' + londonDate.getFullYear() + ', ' + normalizeNumber(londonDate.getHours()) + ':' + normalizeNumber(londonDate.getMinutes()),
            "short": true
          },
          {
            "title": 'Lviv (UKR)',
            "value": normalizeNumber(lvivDate.getDate()) + ' ' + monthNames[lvivDate.getMonth()] + ' ' + lvivDate.getFullYear() + ', ' + normalizeNumber(lvivDate.getHours()) + ':' + normalizeNumber(lvivDate.getMinutes()),
            "short": true
          }
        ],
        "image_url": 'http://benderthebot.herokuapp.com/icons/time.png'
    }]);
  };

  module.exports = timeResponseFunction;

})();