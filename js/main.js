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
var $board, gameOver, $tiedGame, boxA, boxB, boxC, boxD, box;
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

var player = "#1FE5BB";

// EVENT LISTENERS //
$lineH.on('click', handleClick);

$lineV.on('click', handleClick);


// FUNCTIONS //
var initialize = function() {
  player="#1FE5BB";
  gameOver=false;
}

var switchPlayer = function(){
    player = (player==="#1FE5BB") ? "#FF5733" : "#1FE5BB";
}

var detectBox = function(){
 if ($line1.data('clicked') && $line3.data('clicked') && $line4.data('clicked') && $line6.data('clicked') && !boxA){
    $square.css({'background-color':player});
    boxA=true;
    box=player;
    updateScore();
  } else if ($line2.data('clicked') && $line4.data('clicked') && $line5.data('clicked') && $line7.data('clicked') && !boxB){
    $squareB.css({'background-color':player});
    boxB=true;
    box=player;
    updateScore();
  } else if ($line6.data('clicked') && $line8.data('clicked') && $line9.data('clicked') && $line11.data('clicked') && !boxC){
    $squareC.css({'background-color':player});
    boxC=true;
    box=player;
    updateScore();
  } else if ($line7.data('clicked') && $line9.data('clicked') && $line10.data('clicked') && $line12.data('clicked') && !boxD){
    $squareD.css({'background-color':player});
    boxD=true;
    box=player;
    updateScore();
  } else {
    return;
  }
}

 var updateScore = function(){
  if (box==="#1FE5BB"){
    score1++;
    $score1.html(score1.toString());
  } else if (box==="#FF5733") {
    score2++;
    $score2.html(score2.toString());
  }
}

function handleClick(evt) {
  if(player==="#1FE5BB") {
    $(this).css({'background-color':player}).data('clicked', true);
     detectBox();
     switchPlayer();
 } else if(player==="#FF5733"){
    $(this).css({'background-color':player}).data('clicked', true);
     detectBox();
     switchPlayer();
  }
}










