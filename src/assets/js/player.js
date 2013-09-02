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

	this.createShape = function(canvas, x, y) {
		this.spriteCanvas = canvas;
		this.spritex = x;
		this.spritey = y;

		var ctx = this.spriteCanvas.getContext('2d');

		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(this.spritex + this.width / 2, this.spritey);
		ctx.lineTo(this.spritex + this.width, this.spritey + this.height);
		ctx.lineTo(this.spritex, this.spritey + this.height);
		ctx.lineTo(this.spritex + this.width / 2, this.spritey);
		ctx.fill();
	};
};

Game.Player.prototype = new Game.Item();