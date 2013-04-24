var Game = {};

$(document).ready(function(){
	var game = new Game.Engine();
	game.init();
});


// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function log(message) {
	console.log(message);
}