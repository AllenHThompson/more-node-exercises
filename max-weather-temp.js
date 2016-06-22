/*
## Max Weather Temp
Print the max of the temperatures of the list of cities above. You may use the help of the async module.
*/

var request = require('request');
var async = require('async');
var timestamp = require('timestamp');

var cities = [
     'Atlanta, GA',
     'Pheonix, AZ',
     'Dallas, TX',
     'Philadelphia, PA'
];

async.map(cities, getWeather, function(err, results) {
  timestamp('finish');
  var temps = results.map(function(result) {
    return result.main.temp;
  });
  console.log(temps);
  console.log('Max temperature:', getMax2(temps) + '°');
});

// function getMax1(numArray) {
//   return Math.max.apply(null, numArray);
// }

function getMax2(temps){
     return Math.max.apply(null, temps);
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
