Game.Bullets = function() {

	this.shoot = function(player) {

		var bullet    = new Game.Bullet();

		bullet.x = player.x + player.width / 2;
		bullet.y = player.y;

		this.items.push(bullet);
	};

	this.update = function() {
		var deleteBullets = [];

		for (var i = this.items.length - 1; i >= 0; i--)
		{
			var b = this.items[i];
			b.update(b.x, b.y - b.speedy);

			if(b.y < 0) deleteBullets.push(i);
		}

		for (var h = 0; h < deleteBullets.length; h++) {
			this.items.splice(deleteBullets[h],1);
		}
	};
};

Game.Bullets.prototype = new Game.GroupItem();


Game.Bullet = function() {

	this.width         = 2;
	this.height        = 6;
	this.type          = "bullet";

	this.speedy        = 6;
	this.initialSpeedy = this.speedy;

	this.speedx        = 0;
	this.initialSpeedx = this.speedx;

};

Game.Bullet.prototype = new Game.Item();
