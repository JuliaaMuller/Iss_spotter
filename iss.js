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
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(error, null);
      return
    }
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
    
  });
};

function fetchISSFlyOverTimes(coords, callback) {
  const latitude = coords.latitude;
  const longitude = coords.longitude;

  request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error('Error'), null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes[0]);

  });

}

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, time) => {
        if (error) {
          return callback(error, null);
        }
      callback(null, time);
      });
    });
  });
};

module.exports = fetchMyIP;
module.exports = fetchCoordsByIP;
module.exports = fetchISSFlyOverTimes;
module.exports = nextISSTimesForMyLocation;