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

  ////////////////
 //GAME PAGE JS//
////////////////

// VARIABLES //
var board, player, hArray, vArray, boxMade, score1, score2, boardSize;
var p1Color = "#F60303";
var p2Color = "#042AFF";
var $line = $('div.line')
var $message = $('#message');
var $playAgain = $('#playAgain');
var $score1 = $('div#s1');
var $score2 = $('div#s2');
var $lineH = $('td div.h');
var $lineV = $('td div.v');
var $board = $('div#board');
var $player1 = $('div#p1');
var $player2 = $('div#p2');
var $html = $('html');
var $table = $('table');
var $fourBoard = $('li#four');
var $sixBoard = $('li#six');
var $eightBoard = $('li#eight');
var $boardSizeOptions = $('#board-size-options');

// EVENT LISTENERS //
$line.on('click', handleClick);
$line.on('mouseenter', lineHover);
$line.on('mouseleave', lineUnhover);
$playAgain.on('click', initialize);
$forBoard.on('click', fourTable)
// $fourBoard.on('click', setFourBoard);
// $sixBoard.on('click', setSixBoard);
// $eightBoard.on('click', setEightBoard);


// FUNCTIONS //
// function setFourBoard(){
//   boardSize = 4;
// }

// function setSixBoard(){
//   boardSize = 6;
// }

// function setEightBoard(){
//   boardSize = 8;
// }
function fourTable () {
  $boardSizeOptions.hide();
  $table.show();
  initialize();
}
function initialize(){
  // createBoard(boardSize);
  gameOver = false;
  player = 1;
  board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];
  hArray = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
  vArray = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
  render();
  updateTurnMessage();
  $line.data('clicked', false);
  $message.html('');
  $playAgain.html('');
  $board.show();
}

initialize();

function createBoard(s){
  var $boardTemplate = `<tr>
        <td>•</td>
        <td><div id="h${i}" class="line h"></div></td>
        <td>•</td>
        <td><div id="h1" class="line h"></div></td>
        <td>•</td>
        <td><div id="h2" class="line h"></div></td>
        <td>•</td>
        <td><div id="h3" class="line h"></div></td>
        <td>•</td>
      </tr>
      <tr>
        <td><div id="v0" class="line v"></div></td>
        <td><div id="0-0" class="box"></div></td>
        <td><div id="v4" class="line v"></div></td>
        <td><div id="0-1" class="box"></div></td>
        <td><div id="v8" class="line v"></div></td>
        <td><div id="0-2" class="box"></div></td>
        <td><div id="v12" class="line v"></div></td>
        <td><div id="0-3" class="box"></div></td>
        <td><div id="v16" class="line v"></div></td>
      </tr>`

  for (i=0; i<boardSize; i++){
    $tbody.append($boardTemplate);
  }
}

function lineHover(evt){
  if($(this).data('clicked')){
      return;
  } else if (player === 1){
    $(this).css('background-color', p1Color);
  }else if (player === 2){
    $(this).css('background-color', p2Color);
  }
}

function lineUnhover(evt){
  if($(this).data('clicked')){
      return;
  } else {
    $(this).css('background-color', 'transparent');
  }
}

function getAdjCells(lineId){
  var lineNum = parseInt(lineId.substr(1));
  var cells = [];
  var hasTwoCells;
  if(lineId[0] === 'h'){
    hArray[lineNum]=player;
    var row = Math.min((Math.floor(lineNum/board[0].length)), board[0].length);
    hasTwoCells = (row !== board.length && row !== 0);
    var col = Math.min((Math.floor(lineNum-board.length*row)), board[0].length-1);
    row -= row === board.length ? 1 : 0;
    cells.push({row: row, col: col});
    if (hasTwoCells) cells.push({row: row -1, col: col});
  } else {
    vArray[lineNum] = player;
    var col=Math.min((Math.floor(lineNum/board[0].length)), board[0].length);
    hasTwoCells = (col !== board.length && col !== 0);
    var row=Math.min((Math.floor(lineNum-board.length*col)), board[0].length-1);
    col -= col === board.length ? 1 : 0;
    cells.push({row: row, col: col});
    if (hasTwoCells) cells.push({row: row, col: col-1});
  }
  return cells;
}

function render(){
  score1 = 0;
  score2 = 0;
  for(i = 0; i<board.length; i++){
    for(j = 0; j<board[i].length; j++){
      var $bx = $('#' + i + '-' + j);
      if(board[i][j] === 1){
        $($bx).css('background-color', p1Color);
        score1++;
      } else if(board[i][j] === 2){
        $($bx).css('background-color', p2Color);
        score2++
      } else {
        $($bx).css('background-color', 'transparent');
      }
      $score1.html(score1.toString());
      $score2.html(score2.toString());
    };
  };
  function lineColor(lnArray, i, line){
    if(lnArray[i] === 1){
      $(line).css('background-color', p1Color).data('clicked', true);
    } else if(lnArray[i] === 2){
      $(line).css('background-color', p2Color).data('clicked', true);
    } else if (lnArray[i] === false){
      $(line).css('background-color', 'transparent');
    }
  }
  hArray.forEach(function(ln,idx){
    var $ln = $('#h' + idx);
    lineColor(hArray, idx, $ln);
  });
  vArray.forEach(function(ln,idx){
    var $ln = $('#v' + idx);
    lineColor(vArray, idx, $ln);
  });
  updateTurnMessage();
  checkWinner();
}

function switchPlayer(){
  if(!boxMade){
    player = (player === 1) ? 2 : 1;
  } else {
    player = player;
  }
}

function checkWinner(){
  if (!hArray.includes(false) && !vArray.includes(false)){
    if(score1 > score2){
      $board.fadeTo(500, 0.15);
      // $html.css({'background': 'http://i.imgur.com/SIaBwPB.jpg', 'background-size': 'cover'});
      $message.html('PLAYER ONE WINS!');
      $playAgain.html('Play again?');
    } else if(score1 < score2){
      $message.html('PLAYER TWO WINS!');
      $playAgain.html('Play again?');
    } else if(score1===score2){
      $message.html(`It's a tie!`);
      $playAgain.html('Play again?');
    } else return;
  }
}

function updateTurnMessage(){
  if(player === 1){
    $player1.css('text-decoration', 'underline');
    $player2.css('text-decoration', 'none');
  } else {
    $player2.css('text-decoration', 'underline');
    $player1.css('text-decoration', 'none');
  }
}

function handleClick(evt){
  if($(this).data('clicked')) return;
  var cells = getAdjCells($(this).attr('id'));
  cells.forEach(function(cell) {
    var lineVals = getLineValsForCell(cell);
    if (!lineVals.includes(false)) {
      board[cell.row][cell.col] = player;
      boxMade = true;
    }
  });
  switchPlayer();
  render();
  boxMade = false;
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



