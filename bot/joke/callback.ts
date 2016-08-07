/// <reference path="../../typings/index.d.ts" />

var mongodb = require('mongodb');
var mongoC = mongodb.MongoClient;

module.exports = function(callback /*, slackData*/ ) {
    interface dbConfig {
        DB_NAME?: string,
        DB_USERNAME?: string,
        DB_USER_PASSWORD?: string,
        DB_URL_ADDRESS?: string,
        JOKE_ICONS?: string
    }

    var CONST: dbConfig = {};

    // DB details
    CONST.DB_NAME = 'heroku_mzb1clx9';
    CONST.DB_USERNAME = 'getJoke';
    CONST.DB_USER_PASSWORD = 'Testas123';
    CONST.DB_URL_ADDRESS = 'ds037005.mongolab.com:37005';

    // Joke icon image path
    CONST.JOKE_ICONS = 'http://benderthebot.herokuapp.com/icons/joke/';

    mongoC.connect('mongodb://' + CONST.DB_USERNAME + ':' + CONST.DB_USER_PASSWORD + '@' + CONST.DB_URL_ADDRESS + '/' + CONST.DB_NAME, function(err, db) {
        var collection = db.collection('jokes');
        var jokesCount = collection.count({}, {}, function(err, result) {
            var randomJokeId = Math.floor((Math.random() * result) + 1);

            collection.find({
                id: randomJokeId
            }).limit(1).toArray(function(err, result) {

                callback([{
                    "color": global['hexGenerator'](),
                    "title": result[0].joke,
                    "image_url": CONST.JOKE_ICONS + Math.floor(Math.random() * 9 + 1) + '.png'
                }]);

                db.close();
            });

        });
    });
};