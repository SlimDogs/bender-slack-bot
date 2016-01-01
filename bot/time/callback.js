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

  callback([{
      "color": "#ff4800",
      "fields": [
        {
          "title": 'London (GB)',
          "value": londonDate.getDay() + ' ' + monthNames[londonDate.getMonth()] + ' ' + londonDate.getFullYear() + ', ' + londonDate.getHours() + ':' + londonDate.getMinutes(),
          "short": true
        },
        {
          "title": 'Lviv (UKR)',
          "value": lvivDate.getDay() + ' ' + monthNames[lvivDate.getMonth()] + ' ' + lvivDate.getFullYear() + ', ' + lvivDate.getHours() + ':' + lvivDate.getMinutes(),
          "short": true
        }
      ]
  }]);
};