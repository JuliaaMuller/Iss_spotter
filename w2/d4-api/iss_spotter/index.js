const fetchMyIP = require('./iss');
const fetchCoordsByIP = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP("173.176.166.214", (error, data) => {
  console.log(data);

});