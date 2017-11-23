/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../interfaces.ts" />

(() => {
  const mongoDB = require('mongodb');
  const mongoClient = mongoDB.MongoClient;
  const config: Iconfig = require('../config.js');
  
  class JokeCommands {
    private _callback: Function;

    constructor(callback: Function) {
      this._callback = callback;
      this.respond();
    }

    public respond() {
      const _self = this;
      mongoClient.connect(
        `mongodb://${config.DB_USERNAME}:${config.DB_USER_PASSWORD}@${config.DB_URL_ADDRESS}/${config.DB_NAME}`,
        function (err, db) {
          const collection = db.collection('jokes');
          collection.count({}, {}, function (err, result) {
            const randomJokeId = Math.floor((Math.random() * result) + 1);

            collection.find({ id: randomJokeId }).limit(1).toArray(function (err, result) {

              _self._callback([{
                color: global['hexGenerator'](),
                title: result[0].joke,
                image_url: `http://benderthebot.herokuapp.com/icons/joke/${Math.floor(Math.random() * 9 + 1)}.png`
              }]);

              db.close();
            });
          });
      });
    }
  }
  
  module.exports = JokeCommands;  
})();
