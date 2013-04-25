Game.Bullets = function() {

	this.shoot = function(player) {

		var bullet    = new Game.Bullet();

		/*
		bullet.spriteCanvas = sprite.getCanvas();
		sprite.addShapeToSprite(player);*/

		bullet.x = player.x + player.width / 2;
		bullet.y = player.y;

		this.items.push(bullet);
	};
};

Game.Bullets.prototype = new Game.GroupItem();


Game.Bullet = function() {

	this.width         = 2;
	this.height        = 6;
	this.type          = "bullet";

	this.speedy        = -6;
	this.initialSpeedy = this.speedy;

	this.speedx        = 0;
	this.initialSpeedx = this.speedx;

};

Game.Bullet.prototype = new Game.Item();
