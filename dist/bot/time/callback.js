(function () {
    var moment = require('moment-timezone');
    var TimeCommands = (function () {
        function TimeCommands(callback) {
            this._callback = callback;
            this.respond();
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
        TimeCommands.prototype.respond = function () {
            var londonDate = new Date();
            var lvivDate = moment.tz(londonDate, 'Europe/Kiev');
            this._callback([{
                    "color": global['hexGenerator'](),
                    "fields": [
                        {
                            "title": 'London (GB)',
                            "value": this._padNumber(londonDate.getDate()) + " " + this.months[londonDate.getMonth()] + " " + londonDate.getFullYear() + ", " + this._padNumber(londonDate.getHours()) + ":" + this._padNumber(londonDate.getMinutes()),
                            "short": true
                        },
                        {
                            "title": 'Lviv (UKR)',
                            "value": lvivDate.format('DD') + " " + this.months[parseInt(lvivDate.format('M'), 10)] + " " + lvivDate.format('YYYY') + ", " + lvivDate.format('HH') + ":" + lvivDate.format('mm'),
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