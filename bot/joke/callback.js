/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../interfaces.ts" />
(function () {
    'use strict';
    var mongodb = require('mongodb'), mongoC = mongodb.MongoClient, config = require('../config.js');
    module.exports = function (callback /*, slackData*/) {
        mongoC.connect('mongodb://' + config.DB_USERNAME + ':' + config.DB_USER_PASSWORD + '@' + config.DB_URL_ADDRESS + '/' + config.DB_NAME, function (err, db) {
            var collection = db.collection('jokes'), jokesCount = collection.count({}, {}, function (err, result) {
                var randomJokeId = Math.floor((Math.random() * result) + 1);
                collection.find({
                    id: randomJokeId
                }).limit(1).toArray(function (err, result) {
                    callback([{
                            "color": global['hexGenerator'](),
                            "title": result[0].joke,
                            "image_url": 'http://benderthebot.herokuapp.com/icons/joke/' + Math.floor(Math.random() * 9 + 1) + '.png'
                        }]);
                    db.close();
                });
            });
        });
    };
})();
