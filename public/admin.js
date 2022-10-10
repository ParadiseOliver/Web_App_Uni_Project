"use strict";
function formhandler(){
	var access, fore, sur, user;
	access = $("#psw").val();
	fore = $("#forename").val();
	sur = $("#surname").val();
	user = $("#username").val();
	$.post("/people",
	{
		access_token: access,
	    forename: fore,
	    surname: sur,
	    username: user
	}).done(function(){
		alert("Coach successfuly added.");
		$("#postpeople").trigger("reset");
	}).fail(function(){
		var newUser = prompt("Username already taken, please try again with a new username:","Enter new Username.");
		if (newUser === null || newUser === ""){
			$("#postpeople").trigger("reset");
		} else{
			userTaken(newUser);
		}
	});
};	 

function userTaken(username){
	var access, fore, sur, user;
	access = $("#psw").val();
	fore = $("#forename").val();
	sur = $("#surname").val();
	user = username;
	$.post("/people",
	{
		access_token: access,
	    forename: fore,
	    surname: sur,
	    username: user
	}).done(function(){
		alert("Coach successfuly added.");
		$("#postpeople").trigger("reset");
		//return false;
	}).fail(function(){
		var newUser = prompt("Username already taken, please try again with a new username:","Enter new Username.");
		if (newUser === null || newUser === ""){
			$("#postpeople").trigger("reset");
		} else{
			userTaken(newUser);
		}
	});
};