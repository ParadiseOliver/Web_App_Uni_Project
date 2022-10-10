"use strict";
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var peopleFile = fs.readFileSync('public/people.json');
var people = JSON.parse(peopleFile);

app.get('/people', function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.send(people);
});

app.get('/comments', function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.send(comments);
});

app.get('/people/:username', function(req,res){
    res.setHeader('Content-Type', 'application/json');
    for (var person in people){
      if (people[person].username === req.params.username){
        res.send(people[person]);
      }
    }
    res.send("User not found.")
});

app.post('/people', function(req, res){
    if (req.body.access_token === "concertina"){
      var add = true;
      for (var person in people){
        if (people[person].username === req.body.username){
          add = false;
          res.status(400);
          res.send();
        }
      }
      if (add){
        people.push({username: req.body.username, forename: req.body.forename,surname:req.body.surname,rating:0,numberReviews:0,comments:[]
        });
        fs.writeFile('public/people.json', JSON.stringify(people), function (err) {
          if (err) throw err;
        });
      };
    }
  else{
    res.status(403);
  }
    res.send(); 
});

app.post('/review', function(req, res){
  for(var person in people){
    if(people[person].username === req.body.username){
      people[person].rating= parseInt(people[person].rating)+parseInt(req.body.rating);
      people[person].comments.push([req.body.reviewer,req.body.review,req.body.rating]);
      people[person].numberReviews= parseInt(people[person].numberReviews)+1;
      fs.writeFile("public/people.json",JSON.stringify(people),(err) => {
        if (err) {
            console.error(err);
            return;
    };
  });
    }
  }; 
    res.send();
});

module.exports = app;