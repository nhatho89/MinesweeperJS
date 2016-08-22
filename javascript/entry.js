var Game = require('./game.js');

(function () {
  var rootEl = document.getElementById("minesweeper");
  var game = new Game(rootEl, handleClick);
  // var games = 0;

  // var newGame = document.getElementById('new-game');
  //
  //
  // newGame.addEventListener('click', function(e){
  //   e.preventDefault();
  //   games++
  //   var newGameWindow = document.createElement("div")
  //   newGameWindow.id = "new-game-" + games
  //   rootEl.appendChild(newGameWindow)
  //   new Game(newGameWindow);
  // })

  var handleClick = game.openTile;
  document.addEventListener('click', handleClick);
})();
