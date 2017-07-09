var fs = require('fs');
var request = require('request');
var functionRequest = process.argv[2];

function omdbAPI() {
  var movieName = process.argv.slice(3).join('+');
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
      fs.appendFile('log.txt', 'Movie Title: ' + json.Title + ', ', function(error) {
        if (error) {
          return console.log(error);
        }
      })
    }
  })
}

function myTwitter() {
  // this function will grab and show your last 20 tweets and when they were created
  //https://api.twitter.com/1.1/users/search.json?q=markbui
  var Twitter = require('twitter');
  var keys = require('./keys.js');
  var keyList = keys.twitterKeys;
  var keyArray = [];
  keyArray.push(keyList);
  var client = new Twitter ({
    consumer_key: keyList.consumer_key,
    consumer_secret: keyList.consumer_secret,
    access_token_key: keyList.access_token_key,
    access_token_secret: keyList.access_token_secret
  });
  console.log(client);
  var params = {screen_name: 'CoderMark7'};
  var twitterURL = 'https://api.twitter.com/1.1/users/search.json?q=' + params;
  // request.post(twitterURL)
}

function mySpotify() {
  // function will show artist, songs name, preview link of the song from spotify, album the song is from. if no song is provided, then will default to show 'the sign' by ace of base
  // https://api.spotify.com /v1/search?q=' + songName + '&type=track';
  var secretKeys = require('./spotify.js');
  var spotifyList = secretKeys.spotifyKeys;
  var spotifyArray = [];
  spotifyArray.push(spotifyList);
  console.log(spotifyArray);
  var songName = process.argv.slice(3).join('+');
  var spotifyURL = 'https://api.spotify.com /v1/search?q=' + songName + '&type=track';
}
// else if (functionRequest === 'spotify-this-song') {
//   var http = require("http");
//   var clientID = '594ed4275dd4486096751f0763a13d7f';
//   var clientSecret = '0a80dee1d72e4744b0e41ade3c459fcf';
//   var spotifyURL = 'https://api.spotify.com/v1/search?q=' + songName +'&type=track' + clientSecret + clientID;
//   request(spotifyURL, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       var json = JSON.parse(body);
//       console.log(json);
//     }
//   })
// }
if (functionRequest === 'movie-this') {
  omdbAPI();
}
else if (functionRequest === 'my-tweets'){
  myTwitter();
}
else if (functionRequest === 'mySpotify'){
  mySpotify();
}


