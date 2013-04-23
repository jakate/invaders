Game.Player = function(){
	this.lastShot      = 0;
	this.shootingSpeed = 5; // per second
	this.autoshoot     = false;

	this.prizes        = []; // picked up prizes that are active

	this.toggleAutoShoot = function() {
		this.autoshoot = this.autoshoot === true ? false : true;
	};

	this.toggleShootingSpeed = function() {
		this.shootingSpeed = this.shootingSpeed === 5 ? 30 : 5;
	};

	this.increaseShootingSpeed = function() {
		this.shootingSpeed = this.shootingSpeed * 2;
	};
};

Game.Player.prototype = new Game.Item();