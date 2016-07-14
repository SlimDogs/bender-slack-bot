var https = require('https');

module.exports = function() {

    function postMsg(message) {
        var req = https.request({
            hostname: 'hooks.slack.com',
            path: '/services/T0GM8NHU0/B0H9881K8/TE8PaC19TxajzwIhDSun1ge7',
            method: 'POST'
        }, function(res, b, c) {
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                console.log('Data received: ', chunk);
            });
        });

        req.on('error', function(e) {
            console.log('Error while posting message: ' + e.message);
        });

        req.write(JSON.stringify({
            "channel": "#random",
            "username": "Bender",
            "text": message
        }));
        req.end();
    };

    var standUpMessages = [
        'it\'s almost stand up time, have a good one!',
        'it\s your turn for a stand up!',
        'new day, new stand up :)',
        'it is a standuuuuppp timmmeee!!!',
        'don\'t sleep, stand up!'
    ];

    setInterval(function() {
        var d = new Date(),
            minutes = d.getMinutes(),
            hours = d.getHours(),
            days = d.getDay();

        if (days !== 6 && days !== 0) { // No posting on Weekends
            // Morning stand ups announce
            if (hours === 8 && minutes === 59) {
                postMsg('*Team 1* ' + Math.floor((Math.random() * standUpMessages.length) + 1));
            } else if (hours === 9 && minutes === 14) {
                postMsg('*Team 2* ' + Math.floor((Math.random() * standUpMessages.length) + 1));
            }

            /*
            // Lunch time
            else if (hours === 12 && minutes === 0) {
              postMsg('*Lunch time*! Enjoy it :-)');
            }

            //
            else if (hours === 17 && minutes === 55) {
              postMsg('Before starting your travel home have a look on current tube status. <Command: *!tfl*>');
            }
            */
        }

    }, 60000);
};