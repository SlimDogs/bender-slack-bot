(function () {
    var https = require('https');
    var TFLCommands = (function () {
        function TFLCommands(callback) {
            this._callback = callback;
            this.respond();
        }
        TFLCommands.prototype.respond = function () {
            var _self = this;
            https.get('https://api.tfl.gov.uk/line/mode/tube/status', function (res) {
                var body = '';
                res.on('data', function (d) { body += d; });
                res.on('end', function () {
                    var apiResponse = JSON.parse(body);
                    var goodService = apiResponse.filter(function (line) {
                        return line.lineStatuses[0].statusSeverity === 10;
                    }).map(function (line) {
                        return {
                            title: line.name + " Line",
                            value: line.lineStatuses[0].statusSeverityDescription,
                            short: true
                        };
                    });
                    var badService = apiResponse.filter(function (line) {
                        return line.lineStatuses[0].statusSeverity !== 10;
                    }).map(function (line) {
                        return {
                            title: line.name + " Line",
                            value: line.lineStatuses[0].statusSeverityDescription + ": " + line.lineStatuses[0].reason,
                            short: true
                        };
                    });
                    _self._callback([{
                            "color": badService.length === 0 ? "#08b100" : "#b12500",
                            "fields": badService.concat(goodService),
                            "image_url": 'https://tfl.gov.uk/cdn/static/cms/images/logos/tube-partner.png',
                        }], 'Current *London tube* status:');
                });
            });
        };
        return TFLCommands;
    }());
    module.exports = TFLCommands;
})();