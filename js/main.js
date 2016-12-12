/*
DOTS & BOXES
[Overall Game Play]
1. Define the apps vars
2. Register event listeners
3. Initialize the apps state
4. Render
5. Handle players hovering over position
  5a. Do nothing if position is full
6. Handle Players clicking position
  6a. Do nothing if position is full
  6b. Make game play move
    -Check if box is made
       -if box made add score to player and let player move again until no more boxes are made
    -Mark line for current player
    -Render?
    -Check if game is over (if win or lose)
    -if not game over switch turns
    -Render
*/

// VARIABLES //
var board=[];
var gameOver, $tiedGame, boxA, boxB, boxC, boxD, box, boxMade;
var score1=0;
var score2=0;
var $score1 = $('div#score1');
var $score2 = $('div#score2');
var $message = $('#message');
var $playAgain = $('#playAgain');
var $lineH = $('td div.lineH');
var $lineV = $('td div.lineV');
var $line1 = $('td div#line1');
var $line2 = $('td div#line2');
var $line3 = $('td div#line3');
var $line4 = $('td div#line4');
var $line5 = $('td div#line5');
var $line6 = $('td div#line6');
var $line7 = $('td div#line7');
var $line8 = $('td div#line8');
var $line9 = $('td div#line9');
var $line10 = $('td div#line10');
var $line11 = $('td div#line11');
var $line12 = $('td div#line12');
var $square = $('td div#square');
var $squareB = $('td div#squareb');
var $squareC = $('td div#squarec');
var $squareD = $('td div#squared');


// EVENT LISTENERS //
$lineH.on('click', handleClick);

$lineV.on('click', handleClick);


// FUNCTIONS //
var initialize = function() {
  player="1";
  gameOver=false;
  boxMade = false;
}

initialize();

var switchPlayer = function(){
  if (!boxMade){
    player = (player==="1") ? "2" : "1";
  } else {
    player = player;
    boxMade = false;
  }
}

var detectBox = function(){
 if ($line1.data('clicked') && $line3.data('clicked') && $line4.data('clicked') && $line6.data('clicked') && !boxA){
    render($square);
    boxA=true;
    box=player;
    updateScore();
    boxMade = true;
    return;
  } else if ($line2.data('clicked') && $line4.data('clicked') && $line5.data('clicked') && $line7.data('clicked') && !boxB){
    render($squareB);
    boxB=true;
    box=player;
    updateScore();
    boxMade = true;
    return;
  } else if ($line6.data('clicked') && $line8.data('clicked') && $line9.data('clicked') && $line11.data('clicked') && !boxC){
    render($squareC);
    boxC=true;
    box=player;
    updateScore();
    boxMade = true;
    return;
  } else if ($line7.data('clicked') && $line9.data('clicked') && $line10.data('clicked') && $line12.data('clicked') && !boxD){
    render($squareD)
    boxD=true;
    box=player;
    updateScore();
    boxMade = true;
    return;
  } else {
    gameOver=true;
  }
}

function render(x) {
  //board[x.id]=player //figure out how to reach certain string position
  if(player==="1"){
   x.css({'background-color':"#1FE5BB"});
  } else {
   x.css({'background-color':"#FF5733"});
  }
}

 var updateScore = function(){
  if (box==="1"){
    score1++;
    $score1.html(score1.toString());
  } else if (box==="2") {
    score2++;
    $score2.html(score2.toString());
  }
}

function handleClick(evt) {
  if(player==="1") {
    $(this).css({'background-color':"#1FE5BB"}).data('clicked', true);
     detectBox();
     switchPlayer();
     // checkWinner();
 } else if(player==="2"){
    $(this).css({'background-color':"#FF5733"}).data('clicked', true);
     detectBox();
     switchPlayer();
     // checkWinner();
  }
}

// function checkWinner() {
//   if (!gameOver){
//     return;
//   } else if(gameOver && score1 > score2){
//       $message.html('Player One wins!');
//   } else if(gameOver && score2 > score1){
//       $message.html('Player Two wins!');
//   } else {
//       $message.html("It's a tie!");
//     }
//   }










