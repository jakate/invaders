Game.GroupItem = function() {
	this.items       = [];
	this.slowmode    = false;
	this.stageWidth  = 0;
	this.stageHeight = 0;
};

Game.GroupItem.prototype.update = function(timePassed) {
	timePassed = timePassed/10;

	var u = this.items.length;
	for (var t = 0; t < u; t++) {
		var item = this.items[t];

		if(this.slowmode === true)
		{
			item.speedx   = item.initialSpeedx * 0.5;
			item.speedy   = item.initialSpeedy * 0.5;
		}
		else
		{
			item.speedx   = item.initialSpeedx;
			item.speedy   = item.initialSpeedy;
		}

		var tox = item.x + (item.speedx * timePassed);
		var toy = item.y + (item.speedy * timePassed);

		var offset = 200;
		if(tox > this.stageWidth + offset ||
			tox < 0 - item.width - offset ||
			toy > this.stageHeight + offset ||
			tox < 0 - offset)
		{
			this.kill(item);
			continue;
		}


		item.update(tox, toy);
	}
};

Game.GroupItem.prototype.updateStage = function(sw, sh) {
	this.stageWidth  = sw;
	this.stageHeight = sh;
};

Game.GroupItem.prototype.render = function(ctx) {
	var u = this.items.length;

	for (var t = 0; t < u; t++) {
		this.items[t].render(ctx);
	}
};

Game.GroupItem.prototype.slowDown = function() {
	this.slowmode = true;
};

Game.GroupItem.prototype.resetSpeed = function() {
	this.slowmode = false;
};

Game.GroupItem.prototype.getItems = function() {
	return this.items;
};

Game.GroupItem.prototype.kill = function(killItem) {

	var u = this.items.length;

	for (var i = 0; i < u; i++) {
		if(this.items[i] === killItem)
		{
			this.items.splice(i,1);
		}
	}
};