"use strict";
let firebase = require("./firebaseConfig"),
	currentUser= null;

function getUser(){
	return currentUser;
}

function setUser(uid){
	currentUser = uid;
}
module.exports={getUser,setUser};