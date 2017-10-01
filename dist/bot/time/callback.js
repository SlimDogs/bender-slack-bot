(function () {
    var moment = require('moment-timezone');
    var TimeCommands = (function () {
        function TimeCommands(callback) {
            this._callback = callback;
            this.repsond();
        }
        Object.defineProperty(TimeCommands.prototype, "months", {
            get: function () {
                return [
                    'January', 'February', 'March',
                    'April', 'May', 'June',
                    'July', 'August', 'September',
                    'October', 'November', 'December'
                ];
            },
            enumerable: true,
            configurable: true
        });
        TimeCommands.prototype.repsond = function () {
            var londonDate = new Date();
            var lvivDate = moment.tz(londonDate, 'Europe/Kiev');
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
        };
        TimeCommands.prototype._padNumber = function (digit) {
            return (digit < 10 ? '0' : '') + digit;
        };
        return TimeCommands;
    }());
    module.exports = TimeCommands;
})();