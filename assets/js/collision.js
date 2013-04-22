Game.Collision = function(sw, sh) {

	var self         = this;

	var screenWidth  = sw;
	var screenHeight = sh;

	var gridRows     = 4;
	var gridCols     = 8;

	var gridWidth    = 0;
	var gridHeight   = 0;
	var areas        = [];


	this.createGrid = function() {
		gridWidth  = screenWidth / gridCols;
		gridHeight = screenHeight / gridRows;

		for (var row = 0; row < gridRows; row++) {
			for (var col = 0; col < gridCols; col++) {
				addArea(col * gridWidth, row * gridHeight);
			}
		}
	};

	this.addObjects = function(objects) {
		for (var area = 0; area < areas.length; area++) {
			areas[area].objects = [];
			for (var i = 0; i < objects.length; i++) {
				if(objects[i].x > areas[area].x &&
					objects[i].x < areas[area].x + areas[area].width &&
					objects[i].y > areas[area].y &&
					objects[i].y < areas[area].y + areas[area].height)
				{
					areas[area].objects.push(objects[i]);
				}
			}
		}
	};

	this.detect = function() {

		var colliding = [];

		// loop through all objects in this area
		for (var area = 0; area < areas.length; area++) {

			var myObjects = areas[area].objects;

			// If theres less than 2 objects in this area, skip to next
			if(myObjects.length < 2) continue;

			// Check every object...
			for (var object = 0; object < myObjects.length; object++) {

				// ...against every object, wether they collide
				for (var object2 = 0; object2 < myObjects.length; object2++) {

					// ignore if objects are the same object (loop in loop)
					if(object === object2) continue;

					if(myObjects[object].x > myObjects[object2].x + myObjects[object2].width) continue;
					if(myObjects[object].x + myObjects[object].width < myObjects[object2].x) continue;
					if(myObjects[object].y > myObjects[object2].y + myObjects[object2].height) continue;
					if(myObjects[object].y + myObjects[object].height < myObjects[object2].y) continue;

					// if objects are the same type, ignore them
					if(myObjects[object].type === myObjects[object2].type) continue;

					colliding.push({object1: myObjects[object], object2: myObjects[object2]});
				}

			}
		}

		return colliding;
	};

	this.drawGrid = function(ctx){
		for (var area = 0; area < areas.length; area++) {
			drawArea(areas[area], ctx);
		}
	};

	var	addArea = function(x, y) {
		areas.push({x: x, y: y, width: screenWidth / gridCols, height: screenHeight / gridRows, objects: []});
	};

	var drawArea = function(area, ctx) {
		ctx.beginPath();
		ctx.rect(area.x, area.y, area.width, area.height);
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'white';
		ctx.stroke();

		ctx.lineWidth=1;
		ctx.fillStyle="#fff";
		ctx.font="14px sans-serif";
		ctx.fillText("Objects: " + area.objects.length, area.x, area.y + 20);
	};


};