var time = require('time');

module.exports = function (callback, slackData) {
  var monthNames = [
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

  var londonDate = new Date();
  var lvivDate = new time.Date();
  lvivDate.setTimezone('Europe/Kiev');

  function normalizeNumber(digit, replaceZero) {
    if (replaceZero != null && digit === 0) digit = replaceZero;

    if (digit < 10) {
      return '0' + digit;
    }
    else return digit;
  };

  callback([{
      "color": "#ff4800",
      "fields": [
        {
          "title": 'London (GB)',
          "value": normalizeNumber(londonDate.getDay(), 7) + ' ' + monthNames[londonDate.getMonth()] + ' ' + londonDate.getFullYear() + ', ' + normalizeNumber(londonDate.getHours()) + ':' + normalizeNumber(londonDate.getMinutes()),
          "short": true
        },
        {
          "title": 'Lviv (UKR)',
          "value": normalizeNumber(lvivDate.getDay(), 7) + ' ' + monthNames[lvivDate.getMonth()] + ' ' + lvivDate.getFullYear() + ', ' + normalizeNumber(lvivDate.getHours()) + ':' + normalizeNumber(lvivDate.getMinutes()),
          "short": true
        }
      ]
  }]);
};