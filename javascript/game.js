var Board = require('./board.js');

var Game = function(rootEl) {
  this.rootEl = rootEl;
  var board = new Board(rootEl,8,8)
}

Game.prototype.openTile = function(e) {
  e.preventDefault();

  var el = document.getElementById(e.target.id)
  if (el.dataset.isBomb === "true") {
    alert("game over loser")
  } else {
    el.style.backgroundColor = "blue";
  }
}

module.exports = Game;
