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
  var lvivDate = new Date().toLocaleString('en-US', { timeZone: 'Europe/Kiev' });

  callback([{
      "color": "#ff4800",
      "fields": [
        {
          "title": 'London (GB)',
          "value": londonDate.getDay() + ' ' + monthNames[d.getMonth()] + ' ' + londonDate.getYear(),
          "short": true
        },
        {
          "title": 'Lviv (UKR)',
          "value": lvivDate.getDay() + ' ' + monthNames[d.getMonth()] + ' ' + lvivDate.getYear(),
          "short": true
        }
      ],
      "image_url": 'https://tfl.gov.uk/cdn/static/cms/images/logos/tube-partner.png',
  }]);
};