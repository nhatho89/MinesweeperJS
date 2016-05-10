var Board = function(rootEl,x,y) {
  this.rootEl = rootEl
  this.x = x
  this.y = y
  this.generateBoard();
}

Board.prototype.generateBoard = function() {
  var count = 0;
  var bombs = this.createBombs();
  for (var i = 0; i < this.x; i++) {

    for (var j = 0; j < this.y; j++) {
      var tile = document.createElement("div")
      tile.className = "tile"
      tile.id = "" + count
      tile.dataset.pos = i + "" + j

      for (var bombInd = 0; bombInd < bombs.length; bombInd++) {
        if (bombs[bombInd] + "" === [i,j] + "") {
          tile.dataset.isBomb = "true"
          break
        } else {
          tile.dataset.isBomb = "false"
        }
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

    var x = Math.floor((Math.random() * this.x));
    var y = Math.floor((Math.random() * this.x));

    if (bombs.indexOf([x,y]) === -1) {
      bombs.push([x,y])
    }
  }
  return bombs
}

module.exports = Board;
