/*
## Average Weather Temp
Print the average of the temperatures of the list of cities above. You may use the help of the async module.
*/

var request = require('request');

var cities = [
     'Atlanta, GA',
     'Pheonix, AZ',
     'Dallas, TX',
     'Philadelphia, PA'
];

var results = [];

cities.forEach(function sendRequest(city, idx) {
     getWeather(city, function receiveWeatherInfo(err, data) {
          if (err) {
               console.error(err.message);
               return;
          }
          results.push(data.main.temp);
          console.log('Temperature for ' + data.name + ': ' + data.main.temp + '°');
          if (cities.length === results.length) {
               console.log('Average temperature:', average(results) + '°');
          }
     });
});

function average(results) {
     var sum = results.reduce(function(a, b) {
          return a + b;
     }, 0);
     return sum / results.length;
}

// extract my own asynchronous function
function getWeather(city, callback) {
     request({
          url: 'http://api.openweathermap.org/data/2.5/weather',
          qs: {
               q: city,
               units: 'imperial',
               APPID: 'eac2948bfca65b78a8c5564ecf91d00e'
          }
     }, function(err, response, body) {
          if (err) {
               // call the callback
               callback(err);
               return;
          }
          // convert the body in JSON format to a JS object
          var data = JSON.parse(body);
          // call the callback, passing null for err to signal success
          callback(null, data);
     });
}
