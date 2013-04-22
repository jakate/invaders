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

		prize.speedy        = Math.random()*2;
		prize.initialSpeedy = prize.speedy;

		self.items.push(prize);
	};
};
Game.Prizes.prototype = new Game.GroupItem();


Game.Prize = function() {
	this.prizes = ['slowmotion', 'speedammo'];
	this.prize  = null;
	this.length = 5; // seconds
};
Game.Prize.prototype = new Game.Item();
