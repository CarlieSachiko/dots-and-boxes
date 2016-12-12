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
var board=['','','',''];
var gameOver, $tiedGame, boxA, boxB, boxC, boxD, box, boxMade;
var score1=0;
var score2=0;
var $score1 = $('div#score1');
var $score2 = $('div#score2');
var $message = $('#message');
var $playAgain = $('#playAgain');
var $turnMessage = $('#turnMessage');
var $lineH = $('td div.lineH');
var $lineV = $('td div.lineV');
var $lineH1 = $('td div#lineH1');
var $lineH2 = $('td div#lineH2');
var $lineH3 = $('td div#lineH3');
var $lineH4 = $('td div#lineH4');
var $lineH5 = $('td div#lineH5');
var $lineH6 = $('td div#lineH6');
var $lineV1 = $('td div#lineV1');
var $lineV2 = $('td div#lineV2');
var $lineV3 = $('td div#lineV3');
var $lineV4 = $('td div#lineV4');
var $lineV5 = $('td div#lineV5');
var $lineV6 = $('td div#lineV6');
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
  updateTurnMessage();
}

initialize();

function updateTurnMessage(){
  if(player==="1"){
    $turnMessage.html(`It's Player One's turn`);
  } else {
    $turnMessage.html(`It's Player Two's turn`);
  }
}

var switchPlayer = function(){
  if (!boxMade){
    player = (player==="1") ? "2" : "1";
  } else {
    player = player;
    boxMade = false;
  }
}

var detectBox = function(){
 if ($lineH1.data('clicked') && $lineV1.data('clicked') && $lineH3.data('clicked') && $lineV2.data('clicked') && !boxA){
    render($square);
    boxA=true;
    box=player;
    updateScore();
    boxMade = true;

  } else if ($lineH2.data('clicked') && $lineV2.data('clicked') && $lineH4.data('clicked') && $lineV3.data('clicked') && !boxB){
    render($squareB);
    boxB=true;
    box=player;
    updateScore();
    boxMade = true;

  } else if ($lineH3.data('clicked') && $lineV4.data('clicked') && $lineH5.data('clicked') && $lineV5.data('clicked') && !boxC){
    render($squareC);
    boxC=true;
    box=player;
    updateScore();
    boxMade = true;

  } else if ($lineH4.data('clicked') && $lineV5.data('clicked') && $lineH6.data('clicked') && $lineV6.data('clicked') && !boxD){
    render($squareD)
    boxD=true;
    box=player;
    updateScore();
    boxMade = true;

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
     updateTurnMessage();
     // checkWinner();
 } else if(player==="2"){
    $(this).css({'background-color':"#FF5733"}).data('clicked', true);
     detectBox();
     switchPlayer();
     updateTurnMessage();
     // checkWinner();
  }
}

// function checkWinner() {
//   if (board.length!==4){
//     return;
//   } else if(gameOver && score1 > score2){
//       $message.html('Player One wins!');
//   } else if(gameOver && score2 > score1){
//       $message.html('Player Two wins!');
//   } else {
//       $message.html("It's a tie!");
//     }
//   }










