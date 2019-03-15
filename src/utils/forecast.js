const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/18642c730756254f8860fa9d90ac0c4f/" +
    latitude +
    "," +
    longitude +
    "?units=auto";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " degress out. There is a " +
          body.currently.precipProbability +
          "% chance of rain." +
          "The high temperature of the day is " +
          body.daily.data[0].temperatureHigh +
          " and low is "+ body.daily.data[0].temperatureLow
      );
    }
  });
};

module.exports = forecast;
