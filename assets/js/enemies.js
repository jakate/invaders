Game.Enemies = function(sw) {

	var self = this;

	this.stageWidth = sw;

	this.lastSpawn     = 0;
	this.spawningSpeed = 1; // per second

	this.addEnemy = function() {
		var enemy = new Game.Enemy();

		enemy.width         = 50;
		enemy.height        = 50;
		enemy.x             = Math.random() * this.stageWidth;
		enemy.y             = 0 - enemy.height;
		enemy.type          = "enemy";
		enemy.color         = "#ff0000";

		enemy.speedx        = Math.random()*4;
		enemy.initialSpeedx = enemy.speedx;

		enemy.speedy        = Math.random()*2;
		enemy.initialSpeedy = enemy.speedy;

		self.items.push(enemy);
	};

	this.update = function() {
		for (var i = 0; i < this.items.length; i++) {

			var enemy = this.items[i];
			if(enemy.direction == 1)
			{
				if(enemy.x > this.stageWidth)
				{
					enemy.direction = -1;
				}
			}
			else
			{
				if(enemy.x < 0)
				{
					enemy.direction = 1;
				}
			}

			var posx = enemy.x + (enemy.direction * enemy.speedx);
			var posy = enemy.y + enemy.speedy;

			enemy.update(posx, posy);
		}
	};
};

Game.Enemies.prototype = new Game.GroupItem();


Game.Enemy = function(){
	this.direction = 1;
};

Game.Enemy.prototype = new Game.Item();
