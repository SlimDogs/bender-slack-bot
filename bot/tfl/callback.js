/// <reference path="../../typings/index.d.ts" />
var httpsUtil = require('https');
module.exports = function (callback /*, slackData*/) {
    httpsUtil.get('https://api.tfl.gov.uk/line/mode/tube/status', function (res) {
        // Continuously update stream with data
        var body = '';
        res.on('data', function (d) {
            body += d;
        });
        res.on('end', function () {
            var tubeObj = JSON.parse(body);
            var goodService = [], badService = [];
            for (var i = 0, b = tubeObj.length; i < b; i++) {
                var isOk = tubeObj[i].lineStatuses[0].statusSeverity == 10;
                if (isOk) {
                    goodService.push({
                        "title": tubeObj[i].name + ' Line',
                        "value": tubeObj[i].lineStatuses[0].statusSeverityDescription,
                        "short": true
                    });
                }
                else {
                    badService.push({
                        "title": tubeObj[i].name + ' Line',
                        "value": tubeObj[i].lineStatuses[0].statusSeverityDescription + ': ' + tubeObj[i].lineStatuses[0].reason,
                        "short": false
                    });
                }
            }
            callback([{
                    "color": badService.length === 0 ? "#08b100" : "#b12500",
                    "fields": badService.concat(goodService),
                    "image_url": 'https://tfl.gov.uk/cdn/static/cms/images/logos/tube-partner.png'
                }], 'Current *London tube* status:');
        });
    });
};
