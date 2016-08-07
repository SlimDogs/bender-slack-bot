/// <reference path="../../typings/index.d.ts" />
var http = require('http');
module.exports = function (callback /*, slackData*/) {
    http.get({
        host: 'api.icndb.com',
        path: '/jokes/random'
    }, function (res) {
        // Continuously update stream with data
        var body = '';
        res.on('data', function (d) {
            body += d;
        });
        res.on('end', function () {
            var jokeObj = JSON.parse(body);
            callback([{
                    "color": global['hexGenerator'](),
                    "title": jokeObj.value.joke,
                    "image_url": 'http://benderthebot.herokuapp.com/icons/chucknorris.png'
                }]);
        });
    });
};
