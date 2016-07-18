"use strict";
let firebase = require("./firebaseConfig"),
	provider = new firebase.auth.GoogleAuthProvider();

function logInGoogle() {
	return firebase.auth().signInWithPopup(provider);
}
	firebase.auth().onAuthStateChanged(function(user) {
  		if (user) {
  			console.log("user logged in", user.uid);
    		return user;
    	}
    		 	else {
    		return false;
 		}


});


module.exports = logInGoogle;