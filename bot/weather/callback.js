var http = require('http');

module.exports = function(callback, slackData) {
  http.get({
      host: 'api.openweathermap.org',
      path: '/data/2.5/weather?q=' + (slackData.messageText.indexOf('lviv') >= 0 ? 'lviv' : 'london') + '&units=metric&appid=2de143494c0b295cca9337e1e96b00e0'
  }, function(res) {
      // Continuously update stream with data
      var body = '';
      res.on('data', function(d) {
          body += d;
      });
      res.on('end', function() {
          var wObj = JSON.parse(body);

          function degToCompass(num) { 
            while (num < 0) num += 360;
            while (num >= 360) num -= 360; 
            var val = Math.round((num -11.25 ) / 22.5),
                arr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
            return arr[Math.abs(val)];
          };

          var wTitle = '';
          for (var i = 0, b = wObj.weather.length; i < b; i++) {
            wTitle = wTitle + wObj.weather[i].main + ' (' + wObj.weather[i].description + ')' + ((i + 1) === wObj.weather.length ? '' : ', ');
          }

          var windSpeed = wObj.name === 'Lviv' ? (wObj.wind.speed + 'm/s') : ((Math.round(wObj.wind.speed * 3600 / 1610.3*1000)/1000) + 'mPh');

          callback([{
              "color": "#28b0b8",
              "title": 'Weather in ' + wObj.name +': ' + wTitle,
              "fields": [
                {
                    "title": "Temperature",
                    "value": wObj.main.temp + '°C',
                    "short": true
                },
                {
                    "title": "Wind",
                    "value": windSpeed + ' (' + degToCompass(wObj.wind.deg) + ')',
                    "short": true
                },
                {
                    "title": "Humidity",
                    "value": wObj.main.humidity + '%',
                    "short": true
                },
                {
                    "title": "Pressure",
                    "value": wObj.main.pressure + 'hPa',
                    "short": true
                }      
              ],
              "image_url": 'http://openweathermap.org/img/w/' + wObj.weather[0].icon + '.png',
          }]);
      });
  });
};