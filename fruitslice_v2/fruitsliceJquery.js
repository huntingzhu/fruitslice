// click on start/reset button
    //are we playing?
      //yes
          //reload page
      //no
          //show trials left
          //change button text to "reset game"
          //1. create a random fruit
          //define a random movestep
          //2. move fruit down one movestep every 30sec;
            //is fruit too low?
              //no->repeat nb2;
              //yes->any trials left?
                //yes: repeat nb1;
                //no: show game over, button text:start game.
var playing = false;   // indicate whether we are playing.
var score;
var trialsLeft;
var fruits = ['apple', 'bananas', 'lemon', 'mongo', 'orange', 'peach',
'strawberry', 'watermelon', 'pineapple'];
var movestep;
var action; // interval function;
var level = 2 ; // easy, medium, hard;
var rotateAngle = 1; // roate rotateAngle;
var positionTop;
$(document).ready(function(){
  // click on start/reset button
  $("#startreset").click(function(){

    //are we playing?
    if(playing == true) { // we are playing
      //reload the page
      location.reload();
    }else {// we are not playing;
      playing = true;
      //set score to 0;
      score = 0;
      $("#scorevalue").html(score);

      // show the trials left;
      $("#trialsLeft").show();
      trialsLeft = 3;
      addHearts();

      // change button text to reset game;
      $("#startreset").html("Reset game");

      // change the gameLevel block and the instruction block;
      $("#gameLevel").hide();
      $("#instruction").show();

      // hide the gameOver box;
      $("#gameOver").hide();

      startAction();
    }
  });

  // default level is easy
  $("#easy").css({'background-color': 'rgba(15, 187, 193, 0.92)'});

  $("#easy").click (function() {
    $("#easy").css({'background-color': 'rgba(15, 187, 193, 0.92)'});
    $("#medium").css({'background-color': 'rgba(41, 230, 49, 0.7)'});
    $("#hard").css({'background-color': 'rgba(41, 230, 49, 0.7)'});
    level = 2;
  });

  $("#medium").click (function() {
    $("#easy").css({'background-color': 'rgba(41, 230, 49, 0.7)'});
    $("#medium").css({'background-color': 'rgba(15, 187, 193, 0.92)'});
    $("#hard").css({'background-color': 'rgba(41, 230, 49, 0.7)'});
    level = 4;
  });

  $("#hard").click (function() {
    $("#easy").css({'background-color': 'rgba(41, 230, 49, 0.7)'});
    $("#medium").css({'background-color': 'rgba(41, 230, 49, 0.7)'});
    $("#hard").css({'background-color': 'rgba(15, 187, 193, 0.92)'});
    level = 7;
  });




});

//functions

// add heart icons to the trialsLeft div;
function addHearts() {
  $("#trialsLeft").empty();
  for(var i = 0; i < trialsLeft; i++) {
    $("#trialsLeft").append("<img src='pics/heart.png' class='hearts'>");
  }
}

// start slide those fruits;
function startAction() {
  //generate a fruit
  $("#fruit1").show();
  chooseFruit(); // choose a random fruit;
  $("#fruit1").css({'left': Math.round(600 * Math.random()) + 'px', 'top': -50 + 'px'});
  positionTop = -50;

  // generate a random movestep;
  movestep = level + Math.round(5 * Math.random());

  // Move fruit down by one movestep every 10ms;
  action = setInterval(function() {

    // rotate and move;
    rotateAngle += 1;
    positionTop += movestep;
    $("#fruit1").css({
      "-ms-transform": "rotate(" + rotateAngle +"deg)",
      "-webkit-transform": "rotate(" + rotateAngle +"deg)",
      "transform": "rotate(" + rotateAngle +"deg)",
      'top': positionTop + 'px'
    });

    // check if the truit is too low;
    if($("#fruit1").position().top > $("#displayWindow").height()) {
      $("#fallSound")[0].play(); // play sound;
      // check if we have trials left;
      if(trialsLeft > 1) {
        trialsLeft--; // reduce trials by one;
        addHearts();  // refresh the trials left box;
        // $("#fruit1").hide("explode");// fruit fall to the ground;

        //generate a  new fruit
        chooseFruit(); // choose a random fruit;
        $("#fruit1").css({'left': Math.round(600 * Math.random()), 'top': -50});
        positionTop = -50;
        $("#fruit1").show();
          // generate a new random movestep;
        movestep = level + Math.round(5 * Math.random());
      } else { // game over;
        playing = false;
        $("#fallSound")[0].play(); // play sound;
        // change the gameLevel block and the instruction block;
        $("#gameLevel").show();
        $("#instruction").hide();
        $("#startreset").html("Start Game");
        $("#gameOver").show();
        $("#gameOver").html("<p>Game Over!</p><p>Your Score is " + score + "</p>");
        $("#trialsLeft").hide();
        clearInterval(action);

        $("#fruit1").hide("explode");
      }
    }
  }, 10); // 10ms
}

// slice the fruits;
$("#fruit1").mouseover(function() {
  score++;
  $("#scorevalue").html(score); //update the score value;
  $("#sliceSound")[0].play(); // play sound;

  // stop the current action;
  clearInterval(action);
  $("#fruit1").hide("explode", 300);

  // start a new action;
  setTimeout(startAction, 315); // after 300ms, then start a new action;

});



// generate random fruits;
function chooseFruit() {
  $("#fruit1").attr('src', 'pics/' + fruits[Math.round(8 * Math.random())] +'.png');
}
