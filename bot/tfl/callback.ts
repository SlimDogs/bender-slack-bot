/// <reference path="../../typings/index.d.ts" />

interface tubeService {
  title: string,
  value: string,
  short: boolean
}

(function() {
  'use strict';

  const https = require('https');

  module.exports = function(callback/*, slackData*/) {
    https.get('https://api.tfl.gov.uk/line/mode/tube/status', function(res) {

      // Continuously update stream with data
      let body: string = '';
      res.on('data', function(d) {
          body += d;
      });
      res.on('end', function() {
          let tubeObj = JSON.parse(body);

          let goodService: Array<tubeService> = [],
              badService: Array<tubeService> = [];

          for (let i = 0, b = tubeObj.length; i < b; i++) {
            let isOk: boolean = tubeObj[i].lineStatuses[0].statusSeverity == 10;

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
              "image_url": 'https://tfl.gov.uk/cdn/static/cms/images/logos/tube-partner.png',
          }], 'Current *London tube* status:');
      });
    });
  }

})();