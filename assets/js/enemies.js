Game.Enemies = function(sw) {

	var self = this;

	this.stageWidth = sw;

	this.lastSpawn     = 0;
	this.spawningSpeed = 1; // per second

	this.addEnemy = function() {
		var enemy = new Game.Enemy();
		enemy.createShape();
		enemy.x   = Math.random() * this.stageWidth;
		enemy.y   = 0 - enemy.height;

		self.items.push(enemy);
	};


	this.update = function() {
		for (var i = 0; i < this.items.length; i++) {

			var enemy = this.items[i];

			if(enemy.x > this.stageWidth) enemy.speedx *= -1;
			if(enemy.x < 0) enemy.speedx *= -1;

			enemy.update(enemy.x + enemy.speedx, enemy.y + enemy.speedy);
		}
	};
};

Game.Enemies.prototype = new Game.GroupItem();


Game.Enemy = function(){
	this.width         = 30;
	this.height        = 30;

	this.type          = "enemy";
	this.color         = "#ff0000";
	this.speedx        = Math.random()*4;
	this.initialSpeedx = this.speedx;

	this.speedy        = Math.random()*2;
	this.initialSpeedy = this.speedy;

	this.shape         = [];
	this.size          = 0;
};

Game.Enemy.prototype = new Game.Item();


Game.Enemy.prototype.createShape = function() {
	var rows      = 5;
	var columns   = 5;

	var tmpshape  = [];

	var i = 0;
	var c = 0;
	var p = 0;

	this.size = this.width / columns;

	for (i = 0; i < rows; i++) {

		tmpshape[i] = [];

		for (c = 0; c < Math.ceil(columns/2); c++) {

			var draw = false;
			if(Math.random() > 0.5)
			{
				draw = true;
			}

			tmpshape[i][c] = { x: this.size * c, y: this.size*i, draw: draw};
		}
	}

	for (i = 0; i < tmpshape.length; i++) {

		for (p = 0; p < tmpshape[i].length; p++) {
			var newcol = columns-p;
			tmpshape[i][newcol] = { x: newcol*this.size, y: tmpshape[i][p].y, draw: tmpshape[i][p].draw};

		}
	}

	for (i = 0; i < tmpshape.length; i++) {

		for (p = 0; p < tmpshape[i].length; p++) {
			this.shape.push(tmpshape[i][p]);
		}
	}

};

Game.Enemy.prototype.render = function(ctx) {
	ctx.fillStyle = this.color;

	for (var i = 0; i < this.shape.length; i++) {
		if(this.shape[i].draw)
		{
			ctx.fillRect( this.x + this.shape[i].x, this.y + this.shape[i].y, this.size, this.size);
		}
	}
};