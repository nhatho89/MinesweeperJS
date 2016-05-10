var Game = require('./game.js');



(function () {
  var rootEl = document.getElementById("minesweeper");
  var game = new Game(rootEl);

  var handleClick = game.openTile;
  document.addEventListener('click', handleClick);
})();
