//PSEUDOCODE//
/*DOTS & BOXES
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

--handle line click--
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
var player, boxMade, score1, score2, boardSize, html;
var p1Color = "#F60303";
var p2Color = "#042AFF";
var board = [];
var hArray = [];
var vArray = [];
var $line;
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
var $table = $('#table');
var $board = $('#board');
var $fourBoard = $('div#four');
var $sixBoard = $('div#six');
var $eightBoard = $('div#eight');
var $boardSizeOptions = $('#board-size-options');

// CONSTANTS //
var dotTd = '<td>•</td>';

// EVENT LISTENERS //
function registerListeners() {
  $line = $('div.line')
  $line.on('click', handleClick);
  $line.on('mouseenter', lineHover);
  $line.on('mouseleave', lineUnhover);
}

$playAgain.on('click', restart);
$fourBoard.on('click', function() {setBoard(4);});
$sixBoard.on('click', () => setBoard(6));
$eightBoard.on('click', () => setBoard(8));


  ////////////////
 ////FUNCTIONS///
////////////////

// BOARD CREATION //
function setBoard(size) {
  $board.show();
  hArray=[];
  vArray=[];
  $boardSizeOptions.hide();
  boardSize = size;
  createBoard(size);
  createBoardArrays(size);
  registerListeners();
  $line.data('clicked', false);
}

function buildRowPair(row, size) {
  var sRowPair = '';
  sRowPair = buildRowOne(row, size);
  sRowPair += buildRowTwo(row, size);
  return sRowPair;
}

function buildRowTwo(row, size) {
  var s = '<tr>';
  for (var cellPair = 0; cellPair < size; cellPair++) {
    s += `<td><div id="v${row + (cellPair * size)}" class="line v"></div></td>`;
    s += `<td><div id="${row}-${cellPair}" class="box"></div></td>`;
  }
  s += `<td><div id="v${row + (cellPair * size)}" class="line v"></div></td>`;
  s += '</tr>\n';
  return s;
}

function buildRowOne(row, size) {
  var s = '<tr>';
  for (var cellPair = 0; cellPair < size; cellPair++) {
    var tmp = `<td><div id="h${row * size + cellPair}" class="line h"></div></td>`;
    s += dotTd;
    s += tmp;
  }
  s += dotTd + '</tr>\n';
  return s;
}

function buildLastRow(row, size) {
  var s = '<tr>';
  for (var cellPair = size*size; cellPair <= (size*size); cellPair++) {
    var tmp = `<td><div id="h${row * size + cellPair}" class="line h"></div></td>`;
    s += dotTd;
    s += tmp;
  }
  s += dotTd + '</tr>\n';
  return s;
}

function createBoard(x){
  html = '';
  for (var row = 0; row < x; row++) {
    html += buildRowPair(row, x);
  }
  html += buildRowOne(row, x);

  $table.html(html);
  initialize();
}

function createBoardArrays(x) {
  var innerBrdArr = [];
  for(var i = 0; i < x; i++){
    innerBrdArr.push(0);
  }
  for(var i = 0; i < x; i++){
    board.push(innerBrdArr.slice());
  }
  for(var i = 0; i < (x*(x+1)); i++){
    hArray.push(false);
    vArray.push(false);
  }
}

// GAME PLAY JS //
function restart(){
  $board.hide();
  $boardSizeOptions.show();
  board = [];
  score1 = 0;
  score2 = 0;
  $score1.html(score1.toString());
  $score2.html(score2.toString());
  initialize();
}

function initialize(){
  player = 1;
  render();
  updateTurnMessage();
  $message.html('');
  $playAgain.html('');
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
        score2++;
      } else {
        $($bx).css('background-color', 'transparent');
      }
      $score1.html(score1.toString());
      $score2.html(score2.toString());
    };
  };
  console.log(board);
  boxMade = false;
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
      $message.html('PLAYER ONE WINS!');
      $playAgain.html('Play again?');
    } else if(score1 < score2){
      $message.html('PLAYER TWO WINS!');
      $playAgain.html('Play again?');
    } else if(score1===score2){
      $message.html(`It's a tie!`);
      $playAgain.html('Play again?');
      console.log('aftering winning');
      console.log(score1);
      console.log(score2);
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
      console.log(board);
      boxMade = true;
    }
  });
  switchPlayer();
  render();
  checkWinner();
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



