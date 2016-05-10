// var Tile = require('./tile.js');

var Board = function(rootEl,x,y) {
  this.rootEl = rootEl
  this.x = x
  this.y = y
  this.generateBoard();
  this.assignValue();
}

Board.prototype.handleNeighbors = function (tile) {
  var currentTile = parseInt(tile.id)

  var allNeighbors;
  if (currentTile === 7 || currentTile === 15 || currentTile === 23 || currentTile === 31 || currentTile === 39 || currentTile === 47 || currentTile === 55 ||currentTile === 63) {
    allNeighbors = [
      currentTile - this.x - 1,
      currentTile - 1,
      currentTile + this.x - 1,
      currentTile - this.x,
      currentTile + this.x

    ]
  } else if (currentTile % 8 === 0) {
    allNeighbors = [
      currentTile + 1,
      currentTile - this.x + 1,
      currentTile + this.x + 1,
      currentTile - this.x,
      currentTile + this.x
    ]
  } else {

    allNeighbors = [
      currentTile - this.x - 1,
      currentTile - this.x,
      currentTile - this.x + 1,
      currentTile - 1,
      currentTile + 1,
      currentTile + this.x - 1,
      currentTile + this.x,
      currentTile + this.x + 1
    ]
  }

  for(var i = 0; i < allNeighbors.length; i++) {
    if (allNeighbors[i] >= 0 && allNeighbors[i] < 64) {
      var el = document.getElementById(allNeighbors[i])
      el.dataset.bombCount = parseInt(el.dataset.bombCount) + 1
    }
  }
};

Board.prototype.assignValue = function() {
  var tiles = document.getElementsByClassName("tile")

  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].dataset.isBomb === "true") {
      this.handleNeighbors(tiles[i])
      // tiles[i].style.backgroundColor = "green"
    }
  }
}

Board.prototype.generateBoard = function() {
  var count = 0;
  var bombs = this.createBombs();
  console.log(bombs);

  for (var i = 0; i < this.x; i++) {
    // var tempRow = [];
    for (var j = 0; j < this.y; j++) {
      var tile = document.createElement("div")
      tile.className = "tile"
      tile.id = "" + count
      tile.dataset.row = i
      tile.dataset.col = j
      tile.dataset.bombCount = 0
      tile.style.backgroundColor = "silver"

      if (bombs.indexOf(count) !== -1) {
        tile.dataset.isBomb = "true"
      } else {
        tile.dataset.isBomb = "false"
      }


      this.rootEl.appendChild(tile)
      count++
    }
  }
}

Board.prototype.createBombs = function() {
  var bombs = []
  while (true) {
    if (bombs.length === this.x) {
      break
    }

    var x = Math.floor((Math.random() * 63));


    if (bombs.indexOf(x) === -1) {
      bombs.push(x)
    }
  }
  return bombs
}

module.exports = Board;
