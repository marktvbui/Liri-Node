var keys = require('./keys.js');
var keyList = keys.twitterKeys;
var keyArray = [];
keyArray.push(keyList);

var fs = require('fs');
var request = require('request');
var functionRequest = process.argv[2];


if (functionRequest === 'movie-this') {
  var movieName = process.argv.slice(3).join(' ');
  console.log(movieName);
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var json = JSON.parse(body);
      console.log('Movie title: ' + json.Title);
      console.log('Movie release year: ' + json.Year);
      console.log('IMDB rating: ' + json.imdbRating);
      console.log('Movied Produced in: ' + json.Production);
      console.log('Language: ' + json.Language);
      console.log('Movie Plot: ' + json.Plot);
      console.log('Actors: ' + json.Actors);
    }
  })
}
else if (functionRequest === 'my-tweets') {

}
else if (functionRequest === 'spotify-this-song') {

}


