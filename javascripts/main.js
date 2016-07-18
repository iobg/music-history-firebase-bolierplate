"use strict";

let $ = require('jquery'),
    db = require("./db-interaction"),
    templates = require("./dom-builder"),
    login = require("./user"),
    firebase = require("firebase/app"),
    currentUser = require("./currentUser");


if(firebase.auth().currentUser){
  db.getSongs(templates.makeSongList);
}
else{
  login().then(db.getSongs(templates.makeSongList));
}

//No need to reload the DOM in the ".then"
$(document).on("click", ".save_new_btn", function() {
  let songObj = buildSongObj();
  db.addSong(songObj)
  .then(function(songData){
    console.log("song saved", songData.key);
  });
});

// Load and populate form for editing a song
$(document).on("click", ".edit-btn", function () {
   let songId=$(this).data("edit-id");
   db.getSong(songId).once('value',function(song){
    templates.songForm(song.val(),songId)
    .then(function(finishedForm){
       $(".uiContainer--wrapper").html(finishedForm);
     });
   });

});

//Save edited song to FB then reload DOM with updated song data
$(document).on("click", ".save_edit_btn", function() {
  let songObj = buildSongObj();
  let songId = $(this).attr("id");
  db.editSong(songObj,songId);

});

// Remove song then reload the DOM w/out new song
$(document).on("click", ".delete-btn", function () {
  db.deleteSong($(this).data("delete-id"))
  .then(function(){
    console.log("song deleted");
  });
});

//User login section. Should ideally be in its own module
$("#auth-btn").click(function() {
  console.log("clicked auth");
  login()
  .then(function(result){
    var user = result.user;
    currentUser.setUser(user.uid);
    console.log("logged in user", user.uid);
    db.getSongs(templates.makeSongList);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

});

//Helper functions for forms stuff. Nothing related to Firebase
//Build a song obj from form data.
function buildSongObj() {
    let userId = currentUser.getUser();
    let songObj = {
    title: $("#form--title").val(),
    artist: $("#form--artist").val(),
    album: $("#form--album").val(),
    year: $("#form--year").val(),
    uid: userId
  };
  return songObj;
}

// Load the new song form
$("#add-song").click(function() {
  console.log("clicked add song");
  var songForm = templates.songForm()
  .then(function(songForm) {
    $(".uiContainer--wrapper").html(songForm);
  });
});

