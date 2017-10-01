(function () {
    var http = require('http');
    var ChuckNorrisCommands = (function () {
        function ChuckNorrisCommands(callback) {
            this._callback = callback;
            this.respond();
        }
        ChuckNorrisCommands.prototype.respond = function () {
            http.get({
                host: 'api.icndb.com',
                path: '/jokes/random'
            }, function (res) {
                var body = '';
                res.on('data', function (d) {
                    body += d;
                });
                res.on('end', function () {
                    var jokeObj = JSON.parse(body);
                    this._callback([{
                            "color": global['hexGenerator'](),
                            "title": jokeObj.value.joke,
                            "image_url": 'http://benderthebot.herokuapp.com/icons/chucknorris.png'
                        }]);
                });
            });
        };
        return ChuckNorrisCommands;
    }());
    module.exports = ChuckNorrisCommands;
})();