Game.Enemies = function(sw) {

	var self = this;

	this.stageWidth    = sw;
	this.lastSpawn     = 0;
	this.spawningSpeed = 1; // per second
	this.spawned       = 0;

	var enemyTypes    = 10;

	this.addEnemy = function(sprite) {
		var enemy = new Game.Enemy();
		enemy.x   = Math.random() * this.stageWidth;
		enemy.y   = 0 - enemy.height;

		self.items.push(enemy);

		this.spawned++;

		if(this.spawned > enemyTypes) {
			var spri = sprite.getSpriteOfType('enemy');

			enemy.spritex = spri.x;
			enemy.spritey = spri.y;
			enemy.spriteCanvas = sprite.getCanvas();
		}

		return enemy;
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


Game.Enemy.prototype.createShape = function(canvas, x, y) {

	if( this.spritex !== 0 || this.spritey !== 0 ) return false;

	var rows      = 5;
	var columns   = 5;
	var tmpshape  = [];

	var i = 0;
	var c = 0;

	this.spriteCanvas = canvas;
	this.spritex = x;
	this.spritey = y;

	var ctx = this.spriteCanvas.getContext('2d');

	this.size = this.width / columns-1;

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

		for (c = 0; c < tmpshape[i].length; c++) {
			var newcol = columns-c;
			tmpshape[i][newcol] = { x: newcol*this.size, y: tmpshape[i][c].y, draw: tmpshape[i][c].draw};

		}
	}

	for (i = 0; i < tmpshape.length; i++) {

		for (c = 0; c < tmpshape[i].length; c++) {
			this.shape.push(tmpshape[i][c]);
		}
	}


	ctx.fillStyle = this.color;

	for (i = 0; i < this.shape.length; i++) {
		if(this.shape[i].draw)
		{
			ctx.fillRect( this.spritex + this.shape[i].x, this.spritey + this.shape[i].y, this.size, this.size);
		}
	}

};