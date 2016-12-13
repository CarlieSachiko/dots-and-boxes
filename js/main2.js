/*
handle line click
  return if line is already clicked
  set line to cur player
  get (up to)two adjacent cells--> a fn that returns array [{row:_,col:_},{row:_,col:_}]
  for each adj cell
    if cell is complete
      update board for that cell/cur player
  winner check
  render()
*/


// VARIABLES //
var board, player;
var p1Color="#1FE5BB";
var p2Color="#FF5733";
var $line = $('div.line')
var $message = $('#message');
var $playAgain = $('#playAgain');
var $turnMessage = $('#turnMessage');


// EVENT LISTENERS //
$line.on('click', handleClick);
// $playAgain.on('click', initialize);


// FUNCTIONS //
function initialize(){
  player=1;
  board=[
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ]
  updateTurnMessage();
}
initialize();

function getAdjLines(lineId){
  var cells = [];
  var lineNum = parseInt(lineId.substr(1));
  console.log(lineNum);
  if(lineId[0]==='h'){
    var row=Math.min((Math.floor(lineNum/board[0].length)), board[0].length);
    var col=Math.floor(lineNum-board.length*row);
    cells.push({row, col});
    // if(row > 0){
    //   cells.push({row:row-1, col:col});
    // } else {
      // cells.push({row:row+1, col:col});
    // }
    //if the line clicked is not the right edge,
    //then (if row > 0) cells.push({row: row - 1, col: col});
    console.log(row, col)
  } else {
    var col=Math.min((Math.floor(lineNum)), board[0].length);
    var row=Math.floor(lineNum-board.length*col);
    cells.push({row, col});
    // if(col > 0){
    //   cells.push({row:row, col:col-1});
    // } else {
      // cells.push({row:row, col:col+1});
    // }
    console.log(col)
  }
}

function render(){
//update box colors, and score depending on board array
 board.forEach(function(box,idx){
    var $bx = $('#' + idx);
    if(board[idx]===1){
      $($bx).css('background-color', p1Color);
    } else if(board[idx]===2){
      $($bx).css('background-color', p2Color);
    } else return;
  });
}
}

function switchPlayer(){
  //if box has not been made switch players, else cur player gets another turn
  if (!boxCreated){
    player = (player===1) ? 2 : 1;
  } else {
    player = player;
  }
  updateTurnMessage();
}

function boxCreated(){
//if certain row/col pair values have been clicked,
//then a box has been made, push to board array, and then render
}

function updateScore(){
//if box has been made, look at board and calculate score
}

function checkWinner(){
  //change score1 and score2
  // if ((jQuery.inArray(0,board)===-1)){
  //   if(score1 > score2){
  //     $message.html('Player One wins!');
  //     $playAgain.html('Play again?');
  //   } else if(score2 > score1){
  //     $message.html('Player Two wins!');
  //     $playAgain.html('Play again?');
  //   } else if(score1===score2){
  //     $message.html("It's a tie!");
  //     $playAgain.html('Play again?');
  //   }
  // } else return;
}

function updateTurnMessage(){
  if(player===1){
    $turnMessage.html(`It's Player One's turn`);
  } else {
    $turnMessage.html(`It's Player Two's turn`);
  }
}

function handleClick(evt){
   if($(this).data('clicked')){
    return;
  } else {
    if(player===1){
      $(this).css({'background-color':p1Color}).data('clicked', true);
    } else {
      $(this).css({'background-color':p2Color}).data('clicked', true);
    }
    getAdjLines($(this).attr('id'))
  }
}


