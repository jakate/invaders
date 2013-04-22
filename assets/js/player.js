Game.Player = function(){
	this.lastShot      = 0;
	this.shootingSpeed = 5; // per second
	this.autoshoot     = false;

	this.toggleAutoShoot = function() {
		this.autoshoot = this.autoshoot === true ? false : true;
	};

	this.toggleShootingSpeed = function() {
		this.shootingSpeed = this.shootingSpeed === 5 ? 30 : 5;
	};

	this.render = function(ctx){
		ctx.fillStyle = "#0000ff";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};
};

Game.Player.prototype = new Game.Item();