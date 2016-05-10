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
	  if (el.dataset.isBomb === "true") {
	    alert("game over loser")
	  } else {
	    el.style.backgroundColor = "blue";
	  }
	}
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map