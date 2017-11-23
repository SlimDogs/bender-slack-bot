
(() => {
  class Constants {
    get OPEN_WEATHER_API_TOKEN() { return process.env.BSB_OPEN_WEATHER_API_TOKEN; }
    get DB_NAME() { return process.env.BSB_DB_NAME; }
    get DB_USERNAME() { return process.env.BSB_DB_USERNAME; }
    get DB_USER_PASSWORD() { return process.env.BSB_DB_USER_PASSWORDE; }
    get DB_URL_ADDRESS() { return process.env.BSB_DB_URL_ADDRESS; }
  }

  module.exports = new Constants();
})();
