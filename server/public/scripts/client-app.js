$(document).ready(function () {
  getSongs();

  // respond to submit event on form
  //event listener
  $('#song-form').on('submit', function () {
    event.preventDefault();

    var song = {}; // we will store our song here
    console.log("song object", song);

    // iterate over form fields
    // populate our song object with title and artist

    $.each($('#song-form').serializeArray(), function (i, field) {
      song[field.name] = field.value;
      console.log("song", song);
    });


    // check that the data is getting submitted

    $.ajax({
      type: 'POST',
      url: '/songs',
      data: song,
      success: function (response) {
        console.log('POST /songs works!');
        getSongs();
      },

      error: function (response) {
        console.log('Attempted POST /songs, did not work');
        alert('Didnt Work!!!');
      }
    });
    //end of click function event listener
  });

//song list is the div container where the songs are appended
function getSongs() {
  $.ajax({
    type: 'GET',
    url: '/songs',
    success: function (songs) {
      $('#song-list').empty();
      console.log(songs);
      //goes through songs object and appends div to DOM data is already here so conditional needs to happen sooner
      songs.forEach(function (song) {

        //possible conditoin here to compare songs[] to song ??
        $('#song-list').append('<div>' + song.title + '-' + song.artist + '-' + song.dateAdded + '</div>');
        duplecits = 0;
      });
    },

    error: function () {
      console.log('GET /songs did not work');
    },
  });
}
});
