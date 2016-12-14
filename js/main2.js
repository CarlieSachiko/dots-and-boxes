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
// $lineV.on('click', handleClickV);
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
  console.log(lineId);
  var lineNum = parseInt(lineId.substr(1));
  var cells=[];
  if(lineId[0]==='h'){
    hArray[lineNum]=player;
    // for(i=0; i<2; i++){
      var row=Math.min((Math.floor(lineNum/board[0].length)), board[0].length);
      var col=Math.min((Math.floor(lineNum-board.length*row)), board[0].length-1);
      if (row===4){
        cells.push({row:row-1, col:col});
      } else if (row===0) {
        cells.push({row:row, col:col});
      }else if (row > 0){
        cells.push({row:row, col:col});
        cells.push({row:row-1, col:col});
      }
    // }
    console.log(row, col)
    console.log(hArray);
  } else {
    vArray[lineNum]=player;
    var col=Math.min((Math.floor(lineNum/board[0].length)), board[0].length);
    var row=Math.min((Math.floor(lineNum-board.length*col)), board[0].length-1);
    if (col===4){
        cells.push({row:row, col:col-1});
      } else if (col===0) {
        cells.push({row:row, col:col});
      }else if (row > 0){
        cells.push({row:row, col:col});
        cells.push({row:row, col:col-1});
      }
    console.log(row,col)
    console.log(vArray);
  }
  detectBox(cells);
  console.log(cells);
}

/* win logic psuedocode
1. get lineId
2. get current location of lineId on board
3. see what is on the
  - right
  - left
  - top
  - bottom
4. build object/push to array
5. check if all corerns of box are occupied
  - get the current player making the move
  - if box is "square", award square to current player
6. if square, award points
7. check to see if boar is all occupied, which means game over
*/

function detectBox(cellsArr){
//if the lines surrounding the cell object are clicked,
//then a box has been made, push player to board array, and then render
//get adjacent cells here?
//getAdjCells(lineId);
  // var lineNum = parseInt(lineId.substr(1));
  // for(i=0; i<hArray.length; i++){
  //   if()
  // }

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
  hArray.forEach(function(box,idx){
    var $ln = $('#h' + idx);
    if(hArray[idx]===1){
      $($ln).css('background-color', p1Color);
    } else if(hArray[idx]===2){
      $($ln).css('background-color', p2Color);
    } else return;
  });
  vArray.forEach(function(box,idx){
    var $ln = $('#v' + idx);
    if(vArray[idx]===1){
      $($ln).css('background-color', p1Color);
    } else if(vArray[idx]===2){
      $($ln).css('background-color', p2Color);
    } else return;
  });
}

function updateScore(){
//if box has been made, look at board and calculate score
  if (!boxCreated){
    return
  } else {
    $score1.html(board.filter(function(value){
        return value === 1;
      }).length.toString());
    $score2.httml(board.filter(function(value){
        return value === 2;
      }).length.toString());
  }
}

function switchPlayer(){
  //if box has not been made switch players, else cur player gets another turn
  player = (player===1) ? 2 : 1;
  updateTurnMessage();
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
  } else {
    if(player===1){
      $(this).css({'background-color':p1Color}).data('clicked', true);
    } else {
      $(this).css({'background-color':p2Color}).data('clicked', true);
    }
    getAdjCells($(this).attr('id'));
    switchPlayer();
  }
}

// function handleClickV(evt){
//    if($(this).data('clicked')){
//     return;
//   } else {
//     if(player===1){
//       $(this).css({'background-color':p1Color}).data('clicked', true);
//       vArray[$(this).attr('id').parseInt(substr(1))].push("1");
//     } else {
//       $(this).css({'background-color':p2Color}).data('clicked', true);
//       vArray[$(this).attr('id').parseInt(substr(1))].push("2");
//     }
//     detectBox($(this).attr('id'));
//     switchPlayer();
//   }
// }


