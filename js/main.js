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
var board, hArray, vArray, score1, score2, boxMade;
var $box = $('div#i.box');
var $score1 = $('div#score1');
var $score2 = $('div#score2');
var $message = $('#message');
var $playAgain = $('#playAgain');
var $turnMessage = $('#turnMessage');
var $lineH = $('td div.H');
var $lineV = $('td div.V');
var p1Color="#1FE5BB";
var p2Color="#FF5733";


// EVENT LISTENERS //
$lineH.on('click', handleClickH);
$lineV.on('click', handleClickV);
$playAgain.on('click', initialize);


// FUNCTIONS //
function initialize() {
  player=1;
  boxMade = false;
  updateTurnMessage();
  board=[0,0,0,0];
  hArray=[false,false,false,false,false,false,false,false,false,false,false,false];
  vArray=[false,false,false,false,false,false,false,false,false,false,false,false];
  score1=[];
  score2=[];
  updateScore();
  render();
  checkWinner();
}

initialize();

function updateTurnMessage(){
  if(player===1){
    $turnMessage.html(`It's Player One's turn`);
  } else {
    $turnMessage.html(`It's Player Two's turn`);
  }
}

function switchPlayer(){
  if (!boxMade){
    player = (player===1) ? 2 : 1;
  } else {
    player = player;
    boxMade = false;
  }
  updateTurnMessage();
}

function boxIsMade(i){
  console.log(board);
  board[i]=player;
  render();
  updateScore();
  boxMade=true;
}

function detectBox(){
  for (var i=0; i<10; i++){
    if (i<4){
      if(hArray[i] && vArray[i] && hArray[i+4]&& vArray[i+1]){
        boxIsMade(i);
        boxMade=true;
      }
    } else if (i<9){
      if(hArray[i] && vArray[i+1] && hArray[i+4]&& vArray[i+2]){
        boxIsMade(i);
        boxMade=true;
      }
    } else if (i<14){
      if(hArray[i] && vArray[i+2] && hArray[i+4]&& vArray[i+3]){
        boxIsMade(i);
        boxMade=true;
      }
    } else if (i<19){
      if(hArray[i] && vArray[i+2] && hArray[i+4]&& vArray[i+3]){
        boxIsMade(i);
        boxMade=true;
      }
    } else boxMade=false;
  //   if(gridH[0] && gridV[0] && gridH[2] && gridV[1] && !board[0]){
  //     render(0);
  //     board[i]=player;
  //     updateScore();
  //     boxMade = true;
  //   } else if(gridH[1] && gridV[1] && gridH[3] && gridV[2] && !board[1]){
  //     render(1);
  //     updateScore();
  //     boxMade = true;
  //   } else if(gridH[2] && gridV[3] && gridH[4] && gridV[4] && !board[2]){
  //     render(2);
  //     updateScore();
  //     boxMade = true;
  //   } else if(gridH[3] && gridV[4] && gridH[5] && gridV[5] && !board[3]){
  //     render(3);
  //     updateScore();
  //     boxMade = true;
  //   }
  // }
  }
}

function render() {
  board.forEach(function(box,idx){
    var $bx = $('#' + idx);
    if(board[idx]===1){
      $($bx).css('background-color', p1Color);
    } else if(board[idx]===2){
      $($bx).css('background-color', p2Color);
    } else return;
  });
}

 function updateScore(){
  var score1 = board.filter(function(value){
    return value === 1;
  }).length;
  var score2 = board.filter(function(value){
    return value === 2;
  }).length;
  $score1.html(score1.toString());
  $score2.html(score2.toString());
}

function checkWinner() {
  if ((jQuery.inArray(0,board)===-1)){
    if(score1 > score2){
      $message.html('Player One wins!');
      $playAgain.html('Play again?');
    } else if(score2 > score1){
      $message.html('Player Two wins!');
      $playAgain.html('Play again?');
    } else if(score1===score2){
      $message.html("It's a tie!");
      $playAgain.html('Play again?');
    }
  } else return;
}

function handleClickH(evt) {
  if($(this).data('clicked')){
    return;
  } else if(player===1) {
      hArray[$(this).attr("id").substr(1)]=player;
      $(this).css({'background-color':p1Color}).data('clicked', true);
  } else {
      hArray[$(this).attr("id").substr(1)]=player;
      $(this).css({'background-color':p2Color}).data('clicked', true);
  }
    detectBox();
    checkWinner();
    switchPlayer();
}

function handleClickV(evt) {
  if($(this).data('clicked')){
    return;
  } else if(player===1) {
      vArray[$(this).attr("id").substr(1)]=player;
      $(this).css({'background-color':p1Color}).data('clicked', true);
  } else {
      vArray[$(this).attr("id").substr(1)]=player;
      $(this).css({'background-color':p2Color}).data('clicked', true);
  }
    detectBox();
    checkWinner();
    switchPlayer();
}












