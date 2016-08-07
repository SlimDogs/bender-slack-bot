/// <reference path="../../typings/index.d.ts" />

var http = require('http');

module.exports = function(callback, slackData) {

    interface apiSetup {
        OPEN_WEATHER_API_TOKEN?: string
    }

    var CONST: apiSetup = {};
    CONST.OPEN_WEATHER_API_TOKEN = '89b5367178e25ae61a711df8069000ff';

  var cityName = slackData.messageText.replace('!weather ', '').replace(/\s/g, '+');
  if (cityName === null || cityName === '' || cityName === '!weather') cityName = 'london';


  // Utils
  function degToCompass(num) { 
    while (num < 0) num += 360;
    while (num >= 360) num -= 360; 
    var val = Math.round((num -11.25 ) / 22.5),
        arr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    return arr[Math.abs(val)];
  }

  // Main logic
  http.get({
      host: 'api.openweathermap.org',
      path: '/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + CONST.OPEN_WEATHER_API_TOKEN
  }, function(res) {
      // Continuously update stream with data
      var body = '';
      res.on('data', function(d) {
          body += d;
      });
      res.on('end', function() {
          var wObj = JSON.parse(body);

            if (wObj.weather) {

                var wTitle = '';
                for (var i = 0, b = wObj.weather.length; i < b; i++) {
                wTitle = wTitle + wObj.weather[i].main + ' (' + wObj.weather[i].description + ')' + ((i + 1) === wObj.weather.length ? '' : ', ');
                }

                var windSpeed = wObj.name === 'Lviv' ? (wObj.wind.speed + 'm/s') : ((Math.round(wObj.wind.speed * 3600 / 1610.3 * 1000) / 1000) + 'mPh');

                callback([{
                    "color": global['hexGenerator'](),
                    "title": wTitle,
                    "fields": [{
                        "title": "Temperature",
                        "value": wObj.main.temp + '°C',
                        "short": true
                    }, {
                        "title": "Wind",
                        "value": windSpeed + ' (' + degToCompass(wObj.wind.deg) + ')',
                        "short": true
                    }, {
                        "title": "Humidity",
                        "value": wObj.main.humidity + '%',
                        "short": true
                    }, {
                        "title": "Pressure",
                        "value": wObj.main.pressure + 'hPa',
                        "short": true
                    }],
                    "image_url": 'http://openweathermap.org/img/w/' + wObj.weather[0].icon + '.png',
                }], 'Weather in *' + wObj.name + '* :');

            }
        });
    });
};