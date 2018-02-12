require("dotenv").config();

var fs = require("fs");
var keys=require("./keys.js");
var twitter = require("twitter");
var spotify = require("spotify");

//npm omdb
// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");

// Then run a request to the OMDB API with the movie specified
request("http://www.omdbapi.com/?i=tt3896198&apikey=392b0493", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }
});


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);




//npm twitter
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

client.get(path, params, callback);

//npm spotify
spotify.search({ type: 'track', query: 'I Want it That Way' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
