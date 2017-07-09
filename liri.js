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
      var movieResult = (title + '\n' + year + '\n' + rating + '\n' + location + '\n' + language + '\n' + plot + '\n' + actors + '\n');
      console.log(movieResult);
      fs.appendFile('log.txt', movieResult , function(error) {
        if (error) {
          return console.log(error);
        }
      })
    }
  })
}

function myTwitter() {
  // this function will grab and show your last 20 tweets and when they were created
  var Twitter = require('twitter');
  var keys = require('./keys.js');
  var keyList = keys.twitterKeys;
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

function mySpotify(passingSong) {
  // function will show artist, songs name, preview link of the song from spotify, album the song is from. if no song is provided, then will default to show 'the sign' by ace of base
  var secretKeys = require('./spotify.js');
  var spotifyList = secretKeys.spotifyKeys;
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify({
    id: spotifyList.clientID,
    secret: spotifyList.clientSecret
  });

  var songName = process.argv.slice(3).join('+');
  if (passingSong) {
    songName = passingSong;
   } else if (!songName) {
      songName = 'the sign';
   }

  spotify.search({ type: 'track', query: songName, limit: 5 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
      var songInfo = data.tracks.items[4];
      var searchTerm = ('Searched for: ' + songName);
      var artist = ('Artist: ' + songInfo.artists[0].name);
      var title = ('Title: ' + songInfo.name);
      var album = ('Album: ' + songInfo.album.name);
      var preview= ('Preview: ' + songInfo.preview_url);
      var songResult = (searchTerm + '\n' + artist + '\n' + title + '\n' + album + '\n' + preview);
      console.log(songResult);
      fs.appendFile('log.txt', songResult, function(err) {
        if (err) {
          return console.log(error);
        }
      })
    })
  };

function lastFunction() {
  fs.readFile('random.txt', 'utf8', function(error, data) {
    if (error) {
      return console.log(error);
    }
    var randomTxt = data.split(',');
    passingSong = randomTxt[1];
    mySpotify(passingSong);
  })
}

if (functionRequest === 'movie-this') {
  omdbAPI();
}
else if (functionRequest === 'my-tweets'){
  myTwitter();
}
else if (functionRequest === 'spotify-this-song'){
  mySpotify();
}else if (functionRequest === 'do-what-it-says') {
  lastFunction();
}


