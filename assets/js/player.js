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

	this.render = function(ctx){
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(this.x + this.width / 2, this.y);
		ctx.lineTo(this.x + this.width, this.y + this.height);
		ctx.lineTo(this.x, this.y + this.height);
		ctx.lineTo(this.x + this.width / 2, this.y);
		ctx.fill();

		//ctx.fillRect(this.x, this.y, this.width, this.height);
	};
};

Game.Player.prototype = new Game.Item();