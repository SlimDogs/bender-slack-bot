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
        'it\'s a time to list the things you have done Yesterday!',
        'don\'t sleep, stand up!'
    ];

    setInterval(function() {
        var d = new Date(),
            minutes = d.getMinutes(),
            hours = d.getHours(),
            days = d.getDay();

        if (days !== 6 && days !== 0) { // No posting on Weekends
            // Morning stand ups announce
            var randomNumber = Math.floor((Math.random() * (standUpMessages.length - 1)) + 1),
                randomMessage = standUpMessages[randomNumber];

            if (hours === 8 && minutes === 59) {
                postMsg('*Team 1* ' + randomMessage);
            } else if (hours === 9 && minutes === 14) {
                postMsg('*Team 2* ' + randomMessage);
            }
        }

    }, 60000);
};