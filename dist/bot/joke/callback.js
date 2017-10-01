(function () {
    var mongoDB = require('mongodb');
    var mongoClient = mongoDB.MongoClient;
    var config = require('../config.js');
    var JokeCommands = (function () {
        function JokeCommands() {
        }
        JokeCommands.prototype.construct = function (callback) {
            this._callback = callback;
            this.respond();
        };
        JokeCommands.prototype.respond = function () {
            var _self = this;
            mongoClient.connect("mongodb://" + config.DB_USERNAME + ":" + config.DB_USER_PASSWORD + "@" + config.DB_URL_ADDRESS + "/" + config.DB_NAME, function (err, db) {
                var collection = db.collection('jokes');
                collection.count({}, {}, function (err, result) {
                    var randomJokeId = Math.floor((Math.random() * result) + 1);
                    collection.find({ id: randomJokeId }).limit(1).toArray(function (err, result) {
                        _self._callback([{
                                color: global['hexGenerator'](),
                                title: result[0].joke,
                                image_url: "http://benderthebot.herokuapp.com/icons/joke/" + Math.floor(Math.random() * 9 + 1) + ".png"
                            }]);
                        db.close();
                    });
                });
            });
        };
        return JokeCommands;
    }());
    module.exports = JokeCommands;
})();