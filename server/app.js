
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
//new object created to store the songs object with the date() propert & value
var newObject = {};
var songs = []; //stores our songs
//counter to fire in conditional that counts duplecits
//if the counter is activated it should fire the conditional statement
// var duplicates 0;
app.use(bodyParser.urlencoded({ extended: true }));
 //this is the route from the apps.js client side
app.post('/songs', function (req, res) {
  var song = req.body;
  song.dateAdded = Date();
  var duplicates = false;
  // console.log('newobject', newObject);
  //add date() property and value to the newObject


//looks for empty string from no data in the form in submit
//if true will sendStatus(500)
if(song.title === "" || song.artist === ""){
  res.sendStatus(500);
  // console.log("undefined");

//conditional that will run on first entry if list is empty

  // res.sendStatus(200);
  // console.log('This is songs array, if push', songs);
  // console.log('songs length', songs.length);
  // duplicates = 0;
//loops through object, increments counter if duplecit entry is found
} else {
  songs.forEach(function(theSong,i){
    if (theSong.title == song.title){
      duplicates = true;
    }
  });

//if there is a duplecit sendStatus(500)
//THIS IS NOT RUNNING ON DUPLECIT AFTER ADD DATE CHANGE!!!!
 if(duplicates == true) {
  res.sendStatus(500);
  console.log('There was a duplicate', duplicates);
  //conditional true will push newObject to songs
  //ERROR IS RUNNUNG IN FIRST ENTRY COUSE IF DOUBLE ENTRY
} else {
  songs.push(song);
  console.log('This is the else if' , songs[0]);
  // duplicates = false;
  res.sendStatus(200);
}
}
});



app.get('/songs', function (req, res) {
  res.send(songs);
});

app.get('/*', function (req, res) {
  var file = req.params[0] || '/views/index.html';

  // console.log('What is in req.params[0]?', req.params[0]);

  //console.log('dirname: ', __dirname);
  //console.log('path', path.join(__dirname, '../public', file));
  res.sendFile(path.join(__dirname, './public', file));
});

app.set('port', process.env.PORT || 3000);



app.listen(app.get('port'), function () {
  console.log('Server now running at port ', app.get('port'));
});
