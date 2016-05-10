var Board = require('./board.js');

var Game = function(rootEl) {
  this.rootEl = rootEl;
  var board = new Board(rootEl,8,8)

}

var gameOver = function(el) {
  if (document.getElementsByClassName("game-over").length === 0) {
    el.innerHTML = "💣";
    el.style.backgroundColor = "red";
    var gameOver = document.createElement("h4")
    gameOver.innerHTML = "GAME OVER!"
    gameOver.className = "game-over"
    document.getElementById("minesweeper").appendChild(gameOver)
    
  }

}

var gameWin = function() {
  var allTiles = document.getElementsByClassName("tile")

  for (var i = 0; i < allTiles.length; i++) {
    if (allTiles[i].dataset.isBomb === "true") {
      allTiles[i].innerHTML = "⚑"
    }
  }

}

var checkWin = function() {
  var allTiles = document.getElementsByClassName("tile")
  var count = 0
  for (var i = 0; i < allTiles.length; i++) {
    if (allTiles[i].style.backgroundColor === "white") {
      count++
    }
  }
  if (count === 56) {
    return true
  }
  return false
}

var handleCascade = function(el) {
  var neighbors = getNeighbors(el)
  console.log(neighbors);
  var allTiles = document.getElementsByClassName("tile")
  neighbors.forEach(function(neighbor) {
    if (neighbor >= 0 && neighbor < 64 && allTiles[neighbor].dataset.bombCount === "0" && allTiles[neighbor].style.backgroundColor !== "white") {
      el.style.backgroundColor = "white";
      handleCascade(allTiles[neighbor])
    } else if (neighbor >= 0 && neighbor < 64){
      if (allTiles[neighbor].dataset.bombCount === "0") {
        el.style.backgroundColor = "white";
        allTiles[neighbor].style.backgroundColor = "white";
      } else {
        allTiles[neighbor].style.backgroundColor = "white";
        allTiles[neighbor].innerHTML = allTiles[neighbor].dataset.bombCount
      }
    }
  })
}

var getNeighbors = function(el) {
  var currentTile = parseInt(el.id)

  var allNeighbors;
  if (currentTile === 7 || currentTile === 15 || currentTile === 23 || currentTile === 31 || currentTile === 39 || currentTile === 47 || currentTile === 55 ||currentTile === 63) {
    allNeighbors = [
      currentTile - 8,
      currentTile + 8,
      currentTile + 8 - 1,
      currentTile - 1,
      currentTile - 8 - 1

    ]
  } else if (currentTile % 8 === 0) {
    allNeighbors = [
      currentTile - 8,
      currentTile - 8 + 1,
      currentTile + 1,
      currentTile + 8 + 1,
      currentTile + 8
    ]
  } else {

    allNeighbors = [
      currentTile - 8,
      currentTile - 8 + 1,
      currentTile + 1,
      currentTile + 8 + 1,
      currentTile + 8,
      currentTile + 8 - 1,
      currentTile - 1,
      currentTile - 8 - 1
    ]
  }
  return allNeighbors;
}

Game.prototype.openTile = function(e) {
  e.preventDefault();

  var el = document.getElementById(e.target.id)
  // console.log(e.target.id);
  if (el.dataset.isBomb === "true") {
    gameOver(el);

  } else {

    if (el.dataset.bombCount === "0") {
      handleCascade(el);
    } else {
      el.style.backgroundColor = "white";
      el.innerHTML = el.dataset.bombCount
    }
  }

  if (checkWin()) {
    gameWin();
  }
}

module.exports = Game;
