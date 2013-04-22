Game.Bullets = function() {

	this.shoot = function(player) {

		var bullet    = new Game.Bullet();

		bullet.width         = 2;
		bullet.height        = 6;
		bullet.type          = "bullet";

		bullet.speedy        = 6;
		bullet.initialSpeedy = 6;

		bullet.speedx        = 0;
		bullet.initialSpeedx = 0;

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


Game.Bullet = function() {};
Game.Bullet.prototype = new Game.Item();
