var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };

 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

 var albumJenny = {
     title: 'Goodness',
     artist: 'Jenny Hong',
     label: 'SM',
     year: '2017',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'The Good', duration: '2:43' },
         { title: 'The Bad', duration: '3:23' },
         { title: 'The Ugly', duration: '4:12'},
         { title: 'The Weird', duration: '2:02' },

     ]
 };

 var createSongRow = function(songNumber, songName, songLength) {
    var template =
       '<tr class="album-view-song-item">'
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'
     ;

var $row = $(template);

var clickHandler = function() {
  var songNumber = $(this).attr('data-song-number');
    if (currentlyPlayingSong !== null) {
  // Revert to song number for currently playing song because user started playing new song.
      var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
       currentlyPlayingCell.html(currentlyPlayingSong);
}
    if (currentlyPlayingSong !== songNumber) {
  // Switch from Play -> Pause button to indicate new song is playing.
     $(this).html(pauseButtonTemplate);
      currentlyPlayingSong = songNumber;
}   else if (currentlyPlayingSong === songNumber) {
  // Switch from Pause -> Play button to pause currently playing song.
    $(this).html(playButtonTemplate);
     currentlyPlayingSong = null;
    }
};


var onHover = function(event) {
  var songNumberCell = $(this).find('.song-item-number');
  var songNumber = songNumberCell.attr('data-song-number');

  if (songNumber !== currentlyPlayingSong) {
      songNumberCell.html(playButtonTemplate);
   }
};
var offHover = function(event) {
  var songNumberCell = $(this).find('.song-item-number');
  var songNumber = songNumberCell.attr('data-song-number');

  if (songNumber !== currentlyPlayingSong) {
       songNumberCell.html(songNumber);
   }
};

  $row.find('.song-item-number').click(clickHandler);
     // #2
     $row.hover(onHover, offHover);
     // #3
     return $row;
};

var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {
     // #1
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');

     // #2
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

     // #3
     $albumSongList.empty();

     // #4
     for (var i = 0; i < album.songs.length; i++) {
      var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
      $albumSongList.append($newRow);
     }
 };

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

 // Store state of playing songs
 var currentlyPlayingSong = null;

$(document).ready(function() {
     setCurrentAlbum(albumPicasso);

});

var albumList = [albumPicasso, albumMarconi, albumJenny];
var index = 0;
 albumImage.addEventListener("click", function(event){
   setCurrentAlbum(albumList[index]);
   index++;
   if (index == albumList.length) {
     index = 0; }
   });
