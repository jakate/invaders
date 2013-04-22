Game.GroupItem = function() {
	this.items  = [];
};

Game.GroupItem.prototype.update = function() {
	for (var t = 0; t < this.items.length; t++) {
		var item = this.items[t];
		item.update(item.x + item.speedx, item.y + item.speedy);
	}
};

Game.GroupItem.prototype.render = function(ctx) {
	for (var t = 0; t < this.items.length; t++) {
		this.items[t].render(ctx);
	}
};

Game.GroupItem.prototype.slowDown = function() {
	for (var t = 0; t < this.items.length; t++) {
		this.items[t].slowDown();
	}
};

Game.GroupItem.prototype.resetSpeed = function() {
	for (var t = 0; t < this.items.length; t++) {
		this.items[t].resetSpeed();
	}
};

Game.GroupItem.prototype.getItems = function() {
	return this.items;
};

Game.GroupItem.prototype.kill = function(killItem) {
	//this.items.splice(num,1);
	for (var i = 0; i < this.items.length; i++) {
		if(this.items[i] === killItem)
		{
			this.items.splice(i,1);
		}
	}
};