"use strict";
function getReviews(){
  $.get('/people',function( data ) { 
  populate(data)},"json");
};

function populate(data){
  var block="";
  for(var person in data){
    var username,name,rating,complaints,comments,numberReviews;
    username=data[person].username;
    name=data[person].forename +" "+data[person].surname;
    rating=data[person].rating;
    comments=data[person].comments;
    numberReviews=data[person].numberReviews;
    block+='<div id="'+username+'" style="border-radius:5px;padding:5px;background:rgb(212, 216, 221,0.8)"><div class="row""><div class="col-md-9"><h4>'+name+' - '+username+'</h4></div>';
    if(parseInt(numberReviews)!==0){
      block+='<div class="col-md-3"><h5>Rating: '+Math.round(10*(parseInt(rating)/parseInt(numberReviews)))/10+'/5</h5></div>';
    }
    else{
      block+='<div class="col-md-3"><h5>Rating: '+0+'/5</h5></div>';
    }
    block+='<div class="col-12"><h5>Reviews:</h5></div></div>'
    block+='<div class="row" style=";margin-left:0px;margin-right:0px;">'
    for (var i in comments){
      block+='<p class="col-12" style="background:#f8f8f8;margin-bottom:5px;border-radius:5px"><strong>'+comments[i][0]+': '+comments[i][2]+'/5 - </strong>'+comments[i][1]+'</p>';
    }
    block+='</div></div>'
  }
  $("#forReviews").html(block);
};

function limitRange() {
  if ($("#rating").val() < 0){
    $("#rating").val(0);
  }
  else if ($("#rating").val() > 5){
    $("#rating").val(5);
  }
};

function formhandler(){
  var user, rate, rev, name;
  name=$("#name").val();
  user=$("#coach").val();
  rate=$("#rating").val();
  rev=$("#review").val();
  $.post("/review",
  {
    reviewer: name,
    username: user,
    rating: rate,
    review: rev
  }); 
};

function topRated(){
  $.get('/people',function(data){
  makeList(data)},"json");
}

function makeList(data){
  var list=[];
  for(var person in data){
    if(parseInt(data[person].numberReviews)!==0){
      list.push(Math.round(10*(parseInt(data[person].rating)/parseInt(data[person].numberReviews)))/10);
    }
    else{
      list.push(0);
    }
  };
  list.sort().reverse();
  var top5;
  if(list.length>5){
    top5=list.slice(0,4);
  }
  else{
    top5=list;
  }
  var text="";
  for(var element in top5){
    for(var person in data){
      if(parseFloat(top5[element])===parseFloat(Math.round(10*(parseInt(data[person].rating)/parseInt(data[person].numberReviews)))/10)){
        text+=createTop(data[person],element);
      }
    }
  }
  $("#topRated").html(text);
};

function createTop(person, rank){
  var block="";
  var name,rating,numberReviews;
  name=person.forename +" "+person.surname;
  rating=person.rating;
  numberReviews=person.numberReviews;
  block+='<div class="list-group-item list-group-item-action" style="background:rgb(212, 216, 221,0.8)"><h4>'+(Number(rank)+1)+":  "+name+'</h4>';
  if(parseInt(numberReviews)!==0){
    block+='<div>Rating: '+Math.round(10*(parseInt(rating)/parseInt(numberReviews)))/10+'/5</div></div>';
  }
  else{
    block+='<div>Rating: '+0+'/5</div></div>';
  }
  return block;
};