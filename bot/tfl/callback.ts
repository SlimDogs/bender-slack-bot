/// <reference path="../../typings/index.d.ts" />

(() => {
  const https = require('https');

  interface tubeService {
    title: string,
    value: string,
    short: boolean
  }

  class TFLCommands {
    private _callback: Function;

    constructor(callback: Function) {
      this._callback = callback;

      this.respond();
    }

    public respond() {
      const _self = this;
      https.get('https://api.tfl.gov.uk/line/mode/tube/status', function(res) {
        let body = '';
        res.on('data', function(d) { body += d; });
        res.on('end', function() {
          const apiResponse: any[] = JSON.parse(body);

          const goodService: tubeService[] = apiResponse.filter(line =>
            line.lineStatuses[0].statusSeverity === 10
          ).map(line => {
            return {
              title: `${line.name} Line`,
              value: line.lineStatuses[0].statusSeverityDescription,
              short: true
            }
          });

          const badService: tubeService[] = apiResponse.filter(line =>
            line.lineStatuses[0].statusSeverity !== 10
          ).map(line => {
            return {
              title: `${line.name} Line`,
              value: `${line.lineStatuses[0].statusSeverityDescription}: ${line.lineStatuses[0].reason}`,
              short: true
            }
          });

          _self._callback([{
              "color": badService.length === 0 ? "#08b100" : "#b12500",
              "fields": badService.concat(goodService),
              "image_url": 'https://tfl.gov.uk/cdn/static/cms/images/logos/tube-partner.png',
          }], 'Current *London tube* status:');
        });
      });
    }
  }

  module.exports = TFLCommands;
})();