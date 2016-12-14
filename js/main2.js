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
var board, player, hArray, vArray;
var p1Color="#1FE5BB";
var p2Color="#FF5733";
var $line = $('div.line')
var $message = $('#message');
var $playAgain = $('#playAgain');
var $turnMessage = $('#turnMessage');
var $score1 = $('div#s1');
var $score2 = $('div#s2');
var lines = [];
var $lineH = $('td div.h');
var $lineV = $('td div.v');


// EVENT LISTENERS //
$line.on('click', handleClick);
$playAgain.on('click', initialize);


// FUNCTIONS //
function initialize(){
  player=1;
  board=[
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ]
  hArray=[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
  vArray=[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
  updateTurnMessage();
}

initialize();

function getAdjCells(lineId){
  var lineNum = parseInt(lineId.substr(1));
  var cells=[];
  var hasTwoCells;
  if(lineId[0]==='h'){
    hArray[lineNum]=player;
    var row = Math.min((Math.floor(lineNum/board[0].length)), board[0].length);
    hasTwoCells = (row !== board.length && row !== 0);
    var col = Math.min((Math.floor(lineNum-board.length*row)), board[0].length-1);
    row -= row === board.length ? 1 : 0;
    cells.push({row: row, col: col});
    if (hasTwoCells) cells.push({row: row -1, col: col});
  } else {
    vArray[lineNum]=player;
    var col=Math.min((Math.floor(lineNum/board[0].length)), board[0].length);
    hasTwoCells = (col !== board.length && col !== 0);
    var row=Math.min((Math.floor(lineNum-board.length*col)), board[0].length-1);
    col -= col === board.length ? 1 : 0;
    cells.push({row: row, col: col});
    if (hasTwoCells) cells.push({row: row, col: col-1});
  }
  console.log(cells);
  return cells;
}

function render(){
  var score1 = 0;
  var score2 = 0;
//update box colors, and score depending on board array
  for(i=0; i<board.length; i++){
    for(j=0; j<board[i].length; j++){
      var $bx = $('#' + i + '-' + j);
      if(board[i][j]===1){
        $($bx).css('background-color', p1Color);
        score1++;
      } else if(board[i][j]===2){
        $($bx).css('background-color', p2Color);
        score2++
      } else {
        $($bx).css('background-color', 'transparent');
      }
      $score1.html(score1.toString());
      $score2.html(score2.toString());
    };
  };

  hArray.forEach(function(ln,idx){
    var $ln = $('#h' + idx);
    if(hArray[idx]===1){
      $($ln).css('background-color', p1Color).data('clicked', true);;
    } else if(hArray[idx]===2){
      $($ln).css('background-color', p2Color).data('clicked', true);;
    } else if(hArray[idx]===0){
      $($ln).css('background-color', 'transparent');
    }
  });
  vArray.forEach(function(ln,idx){
    var $ln = $('#v' + idx);
    if(vArray[idx]===1){
      $($ln).css('background-color', p1Color).data('clicked', true);;
    } else if(vArray[idx]===2){
      $($ln).css('background-color', p2Color).data('clicked', true);;
    } else if(vArray[idx]===0){
      $($ln).css('background-color', 'transparent');
    }
  });
  // updateTurnMessage();
}

function switchPlayer(){
  //if box has not been made switch players, else cur player gets another turn
  player = (player===1) ? 2 : 1;
  // if (!lineVals.includes(false)){
  //   return;
  // } else {
  //   player = (player===1) ? 2 : 1;
  // }
}

function checkWinner(){
  // change score1 and score2
  if ((jQuery.inArray(0,board)===-1)){
    if($score1.length > $score2.length){
      $message.html('Player One wins!');
      $playAgain.html('Play again?');
    } else if($score2.length > $score1.length){
      $message.html('Player Two wins!');
      $playAgain.html('Play again?');
    } else if($score1.length===$score2.length){
      $message.html("It's a tie!");
      $playAgain.html('Play again?');
    }
  } else return;
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
   }
    var cells = getAdjCells($(this).attr('id'));
    cells.forEach(function(cell) {
      var lineVals = getLineValsForCell(cell);
      if (!lineVals.includes(false)) {
        board[cell.row][cell.col] = player;
        console.log(board);
      }
    });
    switchPlayer();
    render();
}

function getLineValsForCell(cell) {
  // var {row, col} = cell; ES2015 for the below two lines
  var row = cell.row;
  var col = cell.col;
  var t = row * board[row].length + col;
  var b = t + board[row].length;
  var l = col * board[col].length + row;
  var r = l + board[col].length;
  return [hArray[t], vArray[r], hArray[b], vArray[l]];
}



