var https = require('https');

module.exports = function() {
/*
  setInterval(function() {
    var d = new Date(),
      minutes = d.getMinutes(),
      hours = d.getHours();

    if (hours === 0 && minutes === 0) {
      var postMessage = 'Yeeha - it\'s Midnight!';

      var req = https.request({
          hostname: 'hooks.slack.com' ,
          path: '/services/T0GM8NHU0/B0H9881K8/TE8PaC19TxajzwIhDSun1ge7',
          method: 'POST'
      }, function (res, b, c) {
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            console.log('Data received: ', chunk);
          });
      });

      req.on('error', function (e) {
          console.log('problem with request: ' + e.message);
      });

      req.write(JSON.stringify({
          "channel": "#area45" ,
          "username": "Bender" ,
          "text": postMessage
      }));
      req.end();
    }

  }, 60000);
*/
};