module.exports = (function () {
    var http = require('http');
    var config = require('../config.js');
    var WeatherCommands = (function () {
        function WeatherCommands(callback, slackData) {
            this._callback = callback;
            this._slackData = slackData;
            this.respond();
        }
        Object.defineProperty(WeatherCommands.prototype, "worldDirections", {
            get: function () {
                return ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WeatherCommands.prototype, "city", {
            get: function () {
                var cityName = this._slackData.messageText.replace('!weather ', '').replace(/\s/g, '+');
                if (cityName === null || cityName === '' || cityName === '!weather') {
                    cityName = 'london';
                }
                ;
                return cityName;
            },
            enumerable: true,
            configurable: true
        });
        WeatherCommands.prototype.respond = function () {
            var _self = this;
            http.get({
                host: 'api.openweathermap.org',
                path: "/data/2.5/weather?q=" + this.city + "&units=metric&appid=" + config.OPEN_WEATHER_API_TOKEN
            }, function (res) {
                var body = '';
                res.on('data', function (d) { body += d; });
                res.on('end', function () {
                    var apiResponse = JSON.parse(body);
                    if (apiResponse.weather) {
                        _self._callback([{
                                'color': global['hexGenerator'](),
                                'title': _self._generateTitle(apiResponse.weather),
                                'fields': [{
                                        'title': 'Temperature', 'value': apiResponse.main.temp + "\u00B0C", 'short': true
                                    }, {
                                        'title': 'Wind', 'value': _self._getWindSpeed(apiResponse) + " (" + _self._degreesToString(apiResponse.wind.deg) + ")", 'short': true
                                    }, {
                                        'title': 'Humidity', 'value': apiResponse.main.humidity + "%", 'short': true
                                    }, {
                                        'title': 'Pressure', 'value': apiResponse.main.pressure + "hPa", 'short': true
                                    }],
                                'image_url': "http://openweathermap.org/img/w/" + apiResponse.weather[0].icon + ".png",
                            }], "Weather in *" + apiResponse.name + "* :");
                    }
                });
            });
        };
        WeatherCommands.prototype._degreesToString = function (num) {
            while (num < 0)
                num += 360;
            while (num >= 360)
                num -= 360;
            var val = Math.round((num - 11.25) / 22.5);
            return this.worldDirections[Math.abs(val)];
        };
        WeatherCommands.prototype._generateTitle = function (citiesArray) {
            var title = '';
            citiesArray.forEach(function (city, i) {
                title += city.main + " (" + city.description + ")" + ((i + 1) === citiesArray.length ? '' : ', ');
            });
            return title;
        };
        WeatherCommands.prototype._getWindSpeed = function (apiResponse) {
            if (apiResponse.name === 'Lviv') {
                return apiResponse.wind.speed + "m/s";
            }
            return Math.round(apiResponse.wind.speed * 3600 / 1610.3 * 1000) / 1000 + "mPh";
        };
        return WeatherCommands;
    }());
    return WeatherCommands;
})();