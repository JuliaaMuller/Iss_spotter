const request = require('request');

const fetchMyIP = function(callback) {
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    callback(null, data.ip);
  });
};

const fetchCoordsByIP = function(myIp, callback) {
  request(`https://freegeoip.app/json/${myIp}`, (error, response, body) => {

    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback('Error', null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
    
  });
};

module.exports = fetchMyIP;
module.exports = fetchCoordsByIP;