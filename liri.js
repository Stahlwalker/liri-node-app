require("dotenv").config();

var fs = require("fs");
var keys=require("./keys.js");
var twitter = require("twitter");
var spotify = require("spotify");
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var first_argv = process.argv;
var second_argv = process.argv[2];

//npm twitter

function displayTweets(){

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
function displaySongs(song){
spotify.search({ type: 'track', query: song}, function(err, data) {
  if (err) {
    for(var i = 0; i < data.tracks.items.length; i++){
      var songInfo = data.tracks.items[i];
      console.log("Artist: " + songInfo.artists[0].name);
      console.log("Song: " + songInfo.name);
      console.log("Album: " + songInfo.album.nanme);
      console.log("\n----------\n");

      fs.appendFile('log.txt', songInfo.artist[0].name);
      fs.appendFile("Song: " + songInfo.name);
      fs.appendFile("Album: " + songInfo.album.nanme);
      fs.appendFile("\n----------\n");
    }
    return console.log('Error occurred: ' + err);
  }
 
});
}


//npm omdb

function movieInfo(movie) {
  var request = require("request");
  request("http://www.omdbapi.com/?i=tt3896198&apikey=392b0493", function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var movieInfo = JSON.parse(body);
      if (movieDetails.Response === 'False') {
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
