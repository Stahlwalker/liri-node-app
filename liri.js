require("dotenv").config();

var fs = require("fs");
var keys=require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');


var first_argv = process.argv;
var second_argv = process.argv[2];

getInput(second_argv);

function getInput(second_argv, args) {
  if (logged()) {
    switch (second_argv) {
      case 'myTweets':
        myTweets();
        break;
      case 'spotify-this-song':
      if (args) {
        console.log(' Arguement passed: ' + args);
        spotifyThisSong(args);
      }
      else{
        if (process.argv[3] != null) {
          var song = process.argv.slice(3).join('+');
          spotifyThisSong(song);
        }
        else {
          spotifyThisSong('The Sign');
        }
      }
      break;
    case 'movie-this':
      if (args) {
        movieInfo(args);
      }
      else {
        var movie = process.argv.slice(3).join('+');
        movieInfo(movie);
      }
      break;
    case 'do-what-it-says':
      runCommand();
      break;
    }
  }
}


//npm twitter

function myTweets(){
var client = new Twitter(keys.twitter);
console.log(client);
var params = {screen_name: 'PackersStahl'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for(var i =0; i<tweets.length; i++){
      var date = tweets[i].created_at;
      console.log("@PackersStahl: " + tweets[i].text + "Created at: " + date.substring(0, 19));
      console.log("\n----------\n");

      fs.appendFile('log.txt', "@PackersStahl: " + tweets[i].text + "Created at: " + date.substring(0, 19));
      fs.appendFile('log.txt', "\n----------\n");
    }
  }else{
    console.log('Error occured');
  }
});
}



//npm spotify
function spotifyThisSong(song){
var spotify = new Spotify(keys.spotify);
console.log(spotify);
spotify.search({ type: 'track', query: song}, function(err, data) {
  if (err) {
    for(var i = 0; i < data.tracks.items.length; i++){
      var songInfo = data.tracks.items[i];
      console.log("Artist: " + songInfo.album.artist[0].name);
      console.log("Song: " + songInfo.name);
      console.log("Link: " + songInfo.preview_url);
      console.log("Album: " + songInfo.album.nanme);
      console.log("\n----------\n");

      // fs.appendFile('log.txt', songInfo.artist[0].name);
      fs.appendFile("Artist: " + songInfo.album.artist[0].name);
      fs.appendFile("Song: " + songInfo.name);
      fs.appendFile("Link: " + songInfo.preview_url);
      fs.appendFile("Album: " + songInfo.album.nanme);
      fs.appendFile("\n----------\n");
    }
    return console.log('Error occurred: ' + err);
  }
 
});
}


//npm omdb

function movieInfo(movie) {
  var request = require('request');
  request("http://www.omdbapi.com/?i=tt3896198&apikey=392b0493", function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var movieInfo = JSON.parse(body);
      if (movieInfo.Response === 'False') {
        movieInfo('Mr. Nobody');
        console.log("If you haven't watched Mr. Nobody, then you should http://www.imdb.com/title/tt0485947/, it's also on Netflix " + JSON.parse(body).imdbRating);
      }
      else {  
        console.log("Title: " + JSON.parse(body).imdbTitle);
        console.log("Release Year: " + JSON.parse(body).imdbReleased);
        console.log("Rating: " + JSON.parse(body).imdbRated);
        console.log("Rotten Tomatoes bogus rating: " + JSON.parse(body).imdbRatings);
        console.log("Country where produced: " + JSON.parse(body).imdbCountry);
        console.log("Language: " + JSON.parse(body).imdbLanguage);
        console.log("Plot: " + JSON.parse(body).imdbPlot);
        console.log("Actors: " + JSON.parse(body).imdbActors);
        console.log("\n----------\n");
      }

    }
  });
}


function runCommand() {
  fs.readFile('random.txt', 'utf-8', function (error, data) {
      var fileCommands = data.split(',');
      getInput(fileCommands[0], fileCommands[1]);
  });
}

function logged() {
  // captures all command line inputs
  var inputs = process.argv.slice(2).join(" ");
  // feeeds the  data to the log file
  // console.log(inputs);
  // appends data to the log file after each run
  fs.appendFile("log.txt", "node liri.js: " + inputs + "\n", function (error) {
      if (error) {
          throw error;
      }
      else {
          console.log(" updated log file! ");
      }
  });
  return true;
}
