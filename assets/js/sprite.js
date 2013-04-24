Game.Sprite = function() {

	var spriteCanvas  = null;
	var spriteCtx     = null;
	var spritex       = 0;
	var spritey       = 0;
	var highestInARow = 0;
	var debug         = false;

	var sprites       = [];

	this.init = function() {
		spriteCanvas        = document.createElement('canvas');
		spriteCanvas.width  = 500;
		spriteCanvas.height = 350;

		spriteCtx = spriteCanvas.getContext('2d');
	};

	this.getCanvas = function() {
		return spriteCanvas;
	};

	this.getSpriteOfType = function(type){

		var itemType = "";
		var item;
		var k;
		while(itemType != type)
		{
			k        = Math.ceil( Math.random() * (sprites.length-1) );
			item     = sprites[k];
			itemType = item.type;
		}

		return item;
	};

	this.addShapeToSprite = function(item) {
		var r = item.createShape(spriteCanvas, spritex, spritey);

		if(r === false) return;

		sprites.push({
			x: spritex,
			y: spritey,
			width: item.width,
			height: item.height,
			type: item.type
		});

		spritex += item.width;

		if(item.height > highestInARow) highestInARow = item.height;

		if(spritex + item.width > spriteCanvas.width)
		{
			spritey += highestInARow;
			spritex = 0;
			highestInARow = 0;
		}
	};

	this.showDebug = function() {
		document.getElementById('body').appendChild(spriteCanvas);

		debug = true;
	};

	this.hideDebug = function() {
		if(debug === false) return;
		document.getElementById('body').removeChild(spriteCanvas);

		debug = false;
	};
};