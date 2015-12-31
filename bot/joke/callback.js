var mongodb = require('mongodb');
var mongoC = mongodb.MongoClient;

module.exports = function(callback, slackData) {

  // Mongo db data - Start
  var dbName = 'heroku_mzb1clx9',
      dbUser = 'getJoke',
      dbUserPassword = 'Testas123',
      dbUrl = 'ds037005.mongolab.com:37005';
  // Mongo db data - End

  mongoC.connect('mongodb://' + dbUser + ':' + dbUserPassword + '@' + dbUrl + '/' + dbName, function (err, db) {
      var collection = db.collection('jokes');
      var randomJokeId = Math.floor((Math.random() * 159) + 1);

      collection.find({ id: randomJokeId }).limit(1).toArray(function (err, result) {
        
        callback('*' + result[0].joke + '*');

        db.close();
      });
  });
};