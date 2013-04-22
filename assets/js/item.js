Game.Item = function() {
	this.x             = 0;
	this.y             = 0;
	this.width         = 50;
	this.height        = 30;

	this.speedy        = 12;
	this.initialSpeedy = 10;

	this.speedx        = 12;
	this.initialSpeedx = 10;

	this.type          = "";

	this.slowmode      = false;
};

Game.Item.prototype.update = function(x, y){
	this.x = x;
	this.y = y;
};

Game.Item.prototype.updatey = function(y){
	this.y = y;
};

Game.Item.prototype.updatex = function(x){
	this.x = x;
};

Game.Item.prototype.render = function(ctx){
	ctx.fillStyle = "#ff0099";
	ctx.fillRect(this.x, this.y, this.width, this.height);
};

Game.Item.prototype.slowDown = function() {
	this.slowmode = true;

	this.speedx   = this.initialSpeedx * 0.2;
	this.speedy   = this.initialSpeedy * 0.2;
};

Game.Item.prototype.resetSpeed = function() {
	if(this.slowmode === true) {
		this.speedx   = this.initialSpeedx;
		this.speedy   = this.initialSpeedy;

		this.slowmode = false;
	}
};