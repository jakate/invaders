Game.Item = function() {
	this.x             = 0;
	this.y             = 0;
	this.width         = 50;
	this.height        = 30;

	this.spriteCanvas  = null;
	this.spritex       = 0;
	this.spritey       = 0;

	this.speedy        = 12;
	this.initialSpeedy = 10;

	this.speedx        = 12;
	this.initialSpeedx = 10;

	this.type          = "";

	this.color         = "#ff0099";

	this.slowmode      = false;
	this.spriteCanvas  = null;
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
	if(this.spriteCanvas)
	{
		ctx.drawImage(this.spriteCanvas, this.spritex, this.spritey, this.width, this.height, this.x, this.y, this.width, this.height);
	}
	else
	{
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
};

Game.Item.prototype.createShape = function(canvas, x, y) {
	this.spriteCanvas = canvas;
	this.spritex = x;
	this.spritey = y;

	var ctx = this.spriteCanvas.getContext('2d');
};
