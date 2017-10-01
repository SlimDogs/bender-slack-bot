(function () {
    var Constants = (function () {
        function Constants() {
        }
        Object.defineProperty(Constants.prototype, "OPEN_WEATHER_API_TOKEN", {
            get: function () { return process.env.BSB_OPEN_WEATHER_API_TOKEN; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Constants.prototype, "DB_NAME", {
            get: function () { return process.env.BSB_DB_NAME; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Constants.prototype, "DB_USERNAME", {
            get: function () { return process.env.BSB_DB_USERNAME; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Constants.prototype, "DB_USER_PASSWORD", {
            get: function () { return process.env.BSB_DB_USER_PASSWORDE; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Constants.prototype, "DB_URL_ADDRESS", {
            get: function () { return process.env.BSB_DB_URL_ADDRESS; },
            enumerable: true,
            configurable: true
        });
        return Constants;
    }());
    module.exports = new Constants();
})();