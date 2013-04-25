Game.Prizes = function(sw) {

	var self = this;

	this.lastSpawn     = 0;
	this.spawningSpeed = 0.1; // per second
	this.stageWidth    = sw;

	this.addPrize = function() {
		var prize = new Game.Prize();

		prize.width         = 20;
		prize.height        = 20;
		prize.type          = "prize";
		prize.color         = "#00ff00";
		prize.x             = Math.random() * this.stageWidth;
		prize.y             = 0 - prize.height;

		prize.prize         = Math.floor(Math.random()*prize.prizes.length);

		prize.speedx        = 0;
		prize.initialSpeedx = prize.speedx;

		prize.speedy        = Math.random()*0.2 + 0.2;
		prize.initialSpeedy = prize.speedy;

		self.items.push(prize);
	};
};
Game.Prizes.prototype = new Game.GroupItem();





Game.Prize = function() {
	this.prizes        = ['slowmotion', 'speedammo', 'ammox3', 'ammox5', 'shield'];
	this.prize         = null;
	this.length        = 5; // seconds

	this.size          = 0;

	this.pulsePos      = 0;
	this.pulseDuration = 50;
};

Game.Prize.prototype = new Game.Item();

Game.Prize.prototype.pulse = function(ctx) {

	var pulseSize = this.width/2 + (this.pulsePos/2);
	ctx.beginPath();
	ctx.arc(this.x + this.size, this.y + this.size, pulseSize, 0, 2 * Math.PI, false);
	ctx.lineWidth   = 2;
	ctx.strokeStyle = this.color;

	ctx.save();
	var alphastep = 1 - (this.pulsePos / this.pulseDuration);
	ctx.globalAlpha = alphastep;
	ctx.stroke();
	ctx.restore();

	this.pulsePos++;

	if(this.pulsePos >= this.pulseDuration) this.pulsePos = 0;
};

Game.Prize.prototype.render = function(ctx){
	this.size = this.width/2;

	ctx.beginPath();
	ctx.arc(this.x + this.size, this.y + this.size, this.size, 0, 2 * Math.PI, false);
	ctx.fillStyle = this.color;
	ctx.fill();

	this.pulse(ctx);
};