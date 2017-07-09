var fs = require('fs');
var request = require('request');
var functionRequest = process.argv[2];

function omdbAPI() {
  var movieName = process.argv.slice(3).join('+');
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var json = JSON.parse(body);
      var title = ('Movie title: ' + json.Title);
      var year = ('Movie release year: ' + json.Year);
      var rating= ('IMDB rating: ' + json.imdbRating);
      var location = ('Movied Produced in: ' + json.Production);
      var language = ('Language: ' + json.Language);
      var plot = ('Movie Plot: ' + json.Plot);
      var actors = ('Actors: ' + json.Actors);
      var movieLog = (title + '\n' + year + '\n' + rating + '\n' + location + '\n' + language + '\n' + plot + '\n' + actors + '\n');
      console.log(movieLog);
      fs.appendFile('log.txt', movieLog , function(error) {
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
  var params = {screen_name: 'CoderMark7', count: 20};
  client.get('statuses/user_timeline', params , function(error, tweets, response){
    if (error) throw error;
    for (var i = 0; i < tweets.length; i++){
      var MyTweets = (tweets[i].created_at + ' '+ tweets[i].text + '\n');
      console.log(MyTweets);
      fs.appendFile('log.txt', MyTweets, function(err) {
        if (err) {
          return console.log(error);
        }
      })
    }
  });
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


