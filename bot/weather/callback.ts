/// <reference path='../../typings/index.d.ts' />
/// <reference path='../../interfaces.ts' />

module.exports = (() => { 
  const http = require('http');
  const config: Iconfig = require('../config.js');

  class WeatherCommands {
    private _callback: Function;
    private _slackData: slackOpts;

    get worldDirections() {
      return ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    }

    get city() {
      let cityName = this._slackData.messageText.replace('!weather ', '').replace(/\s/g, '+');

      if (cityName === null || cityName === '' || cityName === '!weather') {
        cityName = 'london'
      };

      return cityName;
    }

    constructor(callback: Function, slackData: slackOpts) {
      this._callback = callback;
      this._slackData = slackData;

      this.respond();
    }

    public respond() {
      const _self = this;

      http.get({
        host: 'api.openweathermap.org',
        path: `/data/2.5/weather?q=${this.city}&units=metric&appid=${config.OPEN_WEATHER_API_TOKEN}`
      }, (res) => {

        let body = '';
        res.on('data', function(d) { body += d; });
        res.on('end', function() {
          const apiResponse = JSON.parse(body);

          if (apiResponse.weather) {
            _self._callback([{
              'color': global['hexGenerator'](),
              'title': _self._generateTitle(apiResponse.weather),
              'fields': [{
                'title': 'Temperature', 'value': `${apiResponse.main.temp}°C`, 'short': true
              }, {
                'title': 'Wind', 'value': `${_self._getWindSpeed(apiResponse)} (${_self._degreesToString(apiResponse.wind.deg)})`, 'short': true
              }, {
                'title': 'Humidity', 'value': `${apiResponse.main.humidity}%`, 'short': true
              }, {
                'title': 'Pressure', 'value': `${apiResponse.main.pressure}hPa`, 'short': true
              }],
              'image_url': `http://openweathermap.org/img/w/${apiResponse.weather[0].icon}.png`,
            }], `Weather in *${apiResponse.name}* :`);

          }
        });
      });
    }

    private _degreesToString(num: number) {
      while (num < 0) num += 360;
      while (num >= 360) num -= 360;
      const val = Math.round((num - 11.25) / 22.5);

      return this.worldDirections[Math.abs(val)];
    }

    private _generateTitle(citiesArray: any[]) {
      let title = '';
      citiesArray.forEach((city, i) => {
        title +=  `${city.main} (${city.description})${((i + 1) === citiesArray.length ? '' : ', ')}`;
      });

      return title
    }

    private _getWindSpeed(apiResponse: any): string {
      if (apiResponse.name === 'Lviv') {
        return `${apiResponse.wind.speed}m/s`;
      }
      
      return `${Math.round(apiResponse.wind.speed * 3600 / 1610.3 * 1000) / 1000}mPh`;
    }
  }


  return WeatherCommands;
})();