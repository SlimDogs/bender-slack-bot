var http = require('http');

module.exports = function(callback, slackData) {
  http.get({
      host: 'api.icndb.com',
      path: '/jokes/random'
  }, function(res) {
      // Continuously update stream with data
      var body = '';
      res.on('data', function(d) {
          body += d;
      });
      res.on('end', function() {
          var jokeObj = JSON.parse(body);

          callback([{
              "color": "#28b0b8",
              "title": jokeObj.value.joke,
              "image_url": 'http://benderthebot.herokuapp.com/icons/chucknorris.png'
          }]);
      });
  });
};