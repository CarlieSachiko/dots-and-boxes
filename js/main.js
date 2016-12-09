/*
HANGMAN
[Overall Game Play]
1. Define the apps vars
2. Register event listeners
3. Initialize the apps state
4. Render display
5. Handle players clicking theme option (movies, actors, songs, countries, animals, sports, holidays)
6. Handle players clicking letter on keyboard
  6a. Do nothing if blanks are full and game is over
  6b. Make game play move
    -if not game over check if letter selection matches letter in word
    -Add letter to array
    -Check if game is over (if win or lose)
    -Render display
*/

/*
MEMORY PATTERN GAME
[Overall Game Play]
1.


*/


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
       -if box made add score to player
    -Mark line for current player
    -Render?
    -Check if game is over (if win or lose)
    -if not game over switch turns
    -Render
*/

























// 1. Home screen
//   1a. Choose theme
//     -Classic Movies
//     -Pop Stars
//     -food
//     -animals
// 2. In each theme set game
//   2a. initialize function
//     a1. reset display
//     a2. choose random word from list
//     a3. show blanks = word.length
//     a4. show keyboard
//   2b. on Click keyboard event listener
//     b1. test missed/matched and win/lose functions
if clickedLetter = letter in word $$ !gameOver && blanks.length != word.length
//         -show letter on blank array
//         -change clickedLetter color
//         -no longer click clickedLetter
//         -test missed letter function
//         -test lose or win
//           -if hangman is fully shown && blanks.length != word.length print lose message
//           -if !hangman && blanks.length = word.length print win message and play again or go back to categories options

//     b2. On Click keyboard missed letter function
//        -if clickedLetter != letter in word && !gameOver
  //       -change clickedLetter color
  //       -no longer able to click clickedLetter
  //       -if !hangman
  //         -reveal head
  //         -if head reveal body
  //           -if body reveal lLeg
  //             -if lLeg reveal rLeg
  //               -if both Legs reveal lArm
  //                 -if lArm reveal rArm and set gameOver = true
  b3. On click keyboard matched letter function
    -if clickedLetter = letter in word && !gameOver
//         -show letter on blank array
//         -change clickedLetter color
//         -no longer click clickedLetter
//           -if hangman is fully shown && blanks.length != word.length print lose message
//           -if !hangman && blanks.lenght = word.length print win message and play again or go back to categories options
