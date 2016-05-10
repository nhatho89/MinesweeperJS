var Board = require('./board.js');

var Game = function(rootEl) {
  this.rootEl = rootEl;
  var board = new Board(rootEl,8,8)
}

Game.prototype.openTile = function(e) {
  e.preventDefault();

  var el = document.getElementById(e.target.id)
  console.log(e.target.id);
  if (el.dataset.isBomb === "true") {
    el.style.backgroundColor = "red";
    var gameOver = document.createElement("h4")
    gameOver.innerHTML = "GAME OVER!"
    gameOver.className = "game-over"
    document.getElementById("minesweeper").appendChild(gameOver)
  } else {
    el.style.backgroundColor = "white";

    el.innerHTML = el.dataset.bombCount
  }
}

module.exports = Game;
