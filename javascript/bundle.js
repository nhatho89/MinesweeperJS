/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	
	
	
	(function () {
	  var rootEl = document.getElementById("minesweeper");
	  var game = new Game(rootEl);
	
	  var handleClick = game.openTile;
	  document.addEventListener('click', handleClick);
	})();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(2);
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map