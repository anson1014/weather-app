const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=a0b89a38fc74a5fc23a07598fa9329c1&query=${longitude},${latitude}`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(
                undefined,
                `It is ${body.current.temperature} degrees out but it feels like ${body.current.feelslike} degrees.`
            );
        }
    });
};

module.exports = forecast;
