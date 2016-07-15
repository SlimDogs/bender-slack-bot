var time = require('time');

module.exports = function (callback/*, slackData*/) {
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

  function normalizeNumber(digit) {
    if (digit < 10) {
      return '0' + digit;
    }
    else return digit;
  }

  callback([{
      "color": GLOBAL.hexGenerator(),
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