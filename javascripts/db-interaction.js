"use strict";
// This module has no knowledge of the DOM, or where the data goes after it is fetched from Firebase.
// It is only concerned with getting and setting data in the db

let $ = require('jquery'),
    firebase = require("./firebaseConfig"),
    fb= require("./fb-getter.js"),
    fbData = fb();

function getSongs(callback) {
  firebase.database().ref("songs").on("value", function(songData){
    callback(songData.val());
  });
}

function addSong(newSong) {
	return firebase.database().ref('songs').push(newSong);
}

function deleteSong(songId) {
	return firebase.database().ref(`songs/${songId}`).remove();
}

function getSong(songId) {
	return firebase.database().ref(`songs/${songId}`);
}

function editSong(songFormObj, songId) {
	firebase.database().ref(`songs/${songId}`).update(songFormObj);

}

module.exports = {
  getSongs,
  addSong,
  getSong,
  deleteSong,
  editSong
};