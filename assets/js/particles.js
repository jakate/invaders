Game.Particles = function() {

	var amount = 20;

	this.add = function(item) {
		for (var i = 0; i < amount; i++) {
			var p = new Game.Particle();
			p.x             = item.x + (Math.random() * item.width);
			p.y             = item.y + (Math.random() * item.height);
			p.color         = item.color;

			p.initialSpeedx = p.speedx;
			p.initialSpeedy = p.speedy;

			this.items.push(p);
		}
	};

	this.update = function() {

		var deleteParticle = [];

		for (var t = 0; t < this.items.length; t++) {
			var item = this.items[t];
			item.update(item.x + item.speedx, item.y + item.speedy);

			item.lived++;

			if(item.lived > item.lifespan) deleteParticle.push(t);
		}

		for (var i = 0; i < deleteParticle.length; i++) {
			this.items.splice(deleteParticle[i],1);
		}
	};
};

Game.Particles.prototype = new Game.GroupItem();


Game.Particle = function(){
	this.moveSpeed = 4;
	this.lifespan  = 40;
	this.lived     = 0;

	this.width     = Math.random() * 2;
	this.height    = this.width;

	this.lived     = 0;
	this.lifespan  = Math.random() * 140;

	this.speedx    = Math.random() * this.moveSpeed - (this.moveSpeed / 2);
	this.speedy    = Math.random() * this.moveSpeed - (this.moveSpeed / 2);
};

Game.Particle.prototype = new Game.Item();
