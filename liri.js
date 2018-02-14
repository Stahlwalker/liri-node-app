require("dotenv").config();

const fs = require("fs");
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var nodeArgv = process.argv;
var node2Argv = process.argv[2];
var node3Argv = process.argv[3];

getInput(node2Argv);

function getInput(node2Argv, args) {
  if (logged()) {
    switch (node2Argv) {
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
            displaySong('The Sign Ace of Base');
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
        console.log("@PackersStahl: " + tweets[i].text + "Created at: " + date.substring(0, 19));
        console.log("\n----------\n");

        fs.appendFileSync('log.txt', "@PackersStahl: " + tweets[i].text + "Created at: " + date.substring(0, 19));
        fs.appendFileSync('log.txt', "\n----------\n");
      }
    } else {
      console.log('Error occured');
    }
  });
}

//npm spotify
function displaySong(song) {
  var spotify = new Spotify(keys.spotify);
  spotify.search({
    type: 'track',
    query: song
  }, function (err, data) {
    if (err) {
      console.log('Error occurred: ' + "\n");
    } else {
      console.log("\n----------\n");
      console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
      console.log('Song: ' + data.tracks.items[0].name);
      console.log('Preview URL: ' + data.tracks.items[0].preview_url);
      console.log('Album: ' + data.tracks.items[0].album.name);
      console.log("\n----------\n");

      fs.appendFileSync('log.txt', "\n----------\n");
      fs.appendFileSync('log.txt', 'Artist: ' + data.tracks.items[0].album.artists[0].name);
      fs.appendFileSync('log.txt', 'Song: ' + data.tracks.items[0].name);
      fs.appendFileSync('log.txt', 'Preview URL: ' + data.tracks.items[0].preview_url);
      fs.appendFileSync('log.txt', 'Album: ' + data.tracks.items[0].album.name);
      fs.appendFileSync('log.txt', "\n----------\n");

    }

  });
}

//npm omdb
function myMovieInfo(movie) {
  var omdbURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
  var request = require('request');
  request(omdbURL, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var movieInfo = JSON.parse(body);
      if (movieInfo.Response === 'False') {
        myMovieInfo('Mr. Nobody');
        console.log("If you haven't watched Mr. Nobody, then you should http://www.imdb.com/title/tt0485947/, it's also on Netflix.");
        fs.appendFileSync('log.txt', "If you haven't watched Mr. Nobody, then you should http://www.imdb.com/title/tt0485947/, it's also on Netflix.");
      } else {
        console.log("\n----------\n");
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Released);
        console.log("Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatos bogus rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country where produced: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("\n----------\n");

        fs.appendFileSync('log.txt', "\n----------\n");
        fs.appendFileSync('log.txt', "Title: " + JSON.parse(body).Title);
        fs.appendFileSync('log.txt', "Release Year: " + JSON.parse(body).Released);
        fs.appendFileSync('log.txt', "Rating: " + JSON.parse(body).imdbRating);
        fs.appendFileSync('log.txt', "Rotten Tomatos bogus rating: " + JSON.parse(body).Ratings[1].Value);
        fs.appendFileSync('log.txt', "Country where produced: " + JSON.parse(body).Country);
        fs.appendFileSync('log.txt', "Language: " + JSON.parse(body).Language);
        fs.appendFileSync('log.txt', "Plot: " + JSON.parse(body).Plot);
        fs.appendFileSync('log.txt', "Actors: " + JSON.parse(body).Actors);
        fs.appendFileSync('log.txt', "\n----------\n");

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
  // .split("") // convert string to array
  // .join("")  // finally, convert array back to string
  var inputs = process.argv.slice(2).join(" ");
  fs.appendFileSync("log.txt", "node liri.js: " + inputs + "\n", function (error) {
    if (error) {
      throw error;
    } else {
      // log that we saved the info successfully
      console.log(" saved to logtxt file! ");
    }
  });
  return true;
}
