require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');



var first_argv = process.argv;
var second_argv = process.argv[2];
var thrid_argv = process.argv[3];

getInput(second_argv);

function getInput(second_argv, args) {
  if (logged()) {
    switch (second_argv) {
      case 'my-tweets':
        displayTweets();
        break;
      case 'spotify-this-song':
        if (args) {
          console.log(' Arguement passed: ' + args);
          displaySong(args);
        } else {
          if (process.argv[3] != null) {
            var song = process.argv.slice(3).join('+');
            displaySong(song);
          } else {
            displaySong('The Sign');
          }
        }
        break;
      case 'movie-this':
        if (args) {
          myMovieInfo(args);
        } else {
          var movie = process.argv.slice(3).join('+');
          myMovieInfo(movie);
        }
        break;
      case 'do-what-it-says':
        runCommand();
        break;
    }
  }
}


//npm twitter

function displayTweets() {
  var client = new Twitter(keys.twitter);
  console.log(client);
  var params = {
    screen_name: 'PackersStahl'
  };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        var date = tweets[i].created_at;
        console.log("\n----------\n");
        console.log("@PackersStahl: " + tweets[i].text + "Created at: " + date.substring(0, 19));
        console.log("\n----------\n");

        fs.appendFile("\n----------\n");
        fs.appendFile('log.txt', "@PackersStahl: " + tweets[i].text + "Created at: " + date.substring(0, 19));
        fs.appendFile('log.txt', "\n----------\n");
      }
    } else {
      console.log('Error occured');
    }
  });
}



//npm spotify
function displaySong(song) {
  var spotify = new Spotify(keys.spotify);
  // console.log(spotify);
  spotify.search({
    type: 'track',
    query: song
  }, function (err, data) {
    if (err) {
      console.log('Error occurred: ' + "\n");
    }
    else{
      console.log("\n----------\n");
      console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
      console.log('Song Name: ' + data.tracks.items[0].name);
      console.log('Preview URL: ' + data.tracks.items[0].preview_url);
      console.log('Album Name: ' + data.tracks.items[0].album.name);
      console.log("\n----------\n");
     
      fs.appendFile("\n----------\n");
      fs.appendFile('log.txt', 'Artist: ' + data.tracks.items[0].album.artists[0].name);
      fs.appendFile('log.txt', 'Song Name: ' + data.tracks.items[0].name);
      fs.appendFile('log.txt', 'Preview URL: ' + data.tracks.items[0].preview_url);
      fs.appendFile('log.txt', 'Album Name: ' + data.tracks.items[0].album.name);
      fs.appendFile("\n----------\n");


      // for (var i = 0; i < data.tracks.items.length; i++) {
      //   var songInfo = data.tracks.items[i];
      //   console.log("\n----------\n");
      //   console.log("Artist: " + songInfo.album.artist[0].name);
      //   console.log("Song: " + songInfo.name);
      //   console.log("Link: " + songInfo.preview_url);
      //   console.log("Album: " + songInfo.album.nanme);
      //   console.log("\n----------\n");

      //   // fs.appendFile('log.txt', songInfo.artist[0].name);
      //   fs.appendFile("\n----------\n");
      //   fs.appendFile('log.txt', "Artist: " + songInfo.album.artist[0].name);
      //   fs.appendFile('log.txt', "Song: " + songInfo.name);
      //   fs.appendFile('log.txt', "Link: " + songInfo.preview_url);
      //   fs.appendFile('log.txt', "Album: " + songInfo.album.nanme);
      //   fs.appendFile("\n----------\n");
      }
      // return console.log('Error occurred: ' + err);
    

  });
}


//npm omdb

function myMovieInfo(movie) {
  var omdbURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
  // var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';
  // var omdbURL = 'http://www.omdbapi.com/?i=tt3896198&apikey=392b0493';
  var request = require('request');
  request(omdbURL, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var movieInfo = JSON.parse(body);
      if (movieInfo.Response === 'False') {
        myMovieInfo('Mr. Nobody');
        console.log("If you haven't watched Mr. Nobody, then you should http://www.imdb.com/title/tt0485947/, it's also on Netflix.");
        fs.appendFile('log.txt', "If you haven't watched Mr. Nobody, then you should http://www.imdb.com/title/tt0485947/, it's also on Netflix.");
      } else {
        console.log("\n----------\n");
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Released);
        console.log("Rating: " + JSON.parse(body).imdbRating);
        console.log("The Rotten Tomato rating is: " + JSON.parse(body).tomatoRating);
        // console.log("Rotten Tomatoes bogus rating: " + JSON.parse(body).Ratings[1].value);
        console.log("Country where produced: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("\n----------\n");

        fs.appendFile("\n----------\n");
        fs.appendFile('log.txt', "Title: " + JSON.parse(body).Title);
        fs.appendFile('log.txt', "Release Year: " + JSON.parse(body).Released);
        fs.appendFile('log.txt', "Rating: " + JSON.parse(body).imdbRating);
        fs.appendFile("The Rotten Tomato rating is: " + JSON.parse(body).tomatoRating);
        // fs.appendFile('log.txt', "Rotten Tomatoes bogus rating: " + JSON.parse(body).ratings[1].value);
        fs.appendFile('log.txt', "Country where produced: " + JSON.parse(body).Country);
        fs.appendFile('log.txt', "Language: " + JSON.parse(body).Language);
        fs.appendFile('log.txt', "Plot: " + JSON.parse(body).Plot);
        fs.appendFile('log.txt', "Actors: " + JSON.parse(body).Actors);
        fs.appendFile("\n----------\n");

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
  fs.appendFile("log.txt", "node liri.js: " + inputs + "\n", function (error) {
    if (error) {
      throw error;
    } else {
      console.log(" updated log file! ");
    }
  });
  return true;
}
