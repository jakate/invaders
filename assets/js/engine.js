Game.Engine = function() {

	var player;
	var bullets;
	var enemies;
	var particles;
	var prizes;
	var collision;

	var stageWidth;
	var stageHeight;

	var canvas;
	var ctx;

	var date;

	var pause = false;
	var keysDown = [];

	this.init = function(){

		console.log("init...");

		stageWidth  = $(window).width() - 2;
		stageHeight = $(window).height() - 2;

		canvas        = document.getElementById('scene');
		canvas.width  = stageWidth;
		canvas.height = stageHeight;
		ctx           = canvas.getContext('2d');

		//$('#scene').css('cursor','none');

		date      = new Date().getTime();
		bullets   = new Game.Bullets();
		particles = new Game.Particles();
		enemies   = new Game.Enemies(stageWidth);
		prizes    = new Game.Prizes(stageWidth);
		collision = new Game.Collision(stageWidth, stageHeight);
		collision.createGrid();

		player = new Game.Player();
		player.type = "player";
		player.update(canvas.width / 2 - player.width / 2, canvas.height - player.height);

		addControls();
		update();
	};

	var update = function(){

		requestAnimFrame(update);

		if(pause) return;

		var newDate = new Date().getTime();
		var timePassed = newDate - date;
		date = newDate;

		var canSpawnEnemy = (enemies.lastSpawn + (1000 / enemies.spawningSpeed) < newDate);
		if(canSpawnEnemy)
		{
			enemies.addEnemy();
			enemies.lastSpawn = newDate;
		}

		var canSpawnPrize = (prizes.lastSpawn + (1000 / prizes.spawningSpeed) < newDate);
		if(canSpawnPrize)
		{
			prizes.addPrize();
			prizes.lastSpawn = newDate;
		}

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		handleEvents(newDate);

		bullets.update();
		enemies.update();
		particles.update();
		prizes.update();

		detectCollisions();

		drawScene();
	};

	var drawScene = function() {
		bullets.render(ctx);
		enemies.render(ctx);
		particles.render(ctx);
		player.render(ctx);
		prizes.render(ctx);
		collision.drawGrid(ctx);
	};

	var detectCollisions = function() {
		var e = enemies.getItems();
		var b = bullets.getItems();
		var p = prizes.getItems();

		var arr = [];
		var i = 0;
		for (i = 0; i < e.length; i++) { arr.push(e[i]); }
		for (i = 0; i < b.length; i++) { arr.push(b[i]); }
		for (i = 0; i < p.length; i++) { arr.push(p[i]); }
		arr.push(player);

		collision.addObjects(arr);
		var colliding = collision.detect();

		for (i = 0; i < colliding.length; i++) {
			//log(colliding[i].object1.type + " and " + colliding[i].object2.type + " are colliding...");

			if(colliding[i].object1.type == "bullet" && colliding[i].object2.type == "enemy")
			{
				particles.add(colliding[i].object2);
				enemies.kill(colliding[i].object2);
				bullets.kill(colliding[i].object1);
			}

			if(colliding[i].object1.type == "enemy" && colliding[i].object2.type == "bullet")
			{
				particles.add(colliding[i].object1);
				enemies.kill(colliding[i].object1);
				bullets.kill(colliding[i].object2);
			}

		}
	};

	var detectCollision = function(item1, item2){
		if(item1.x > item2.x &&
		item1.x < item2.x + item2.width &&
		item1.y > item2.y &&
		item1.y < item2.y + item2.height)
		{
			return true;
		}

		return false;
	};

	var handleEvents = function(newDate) {
		var canShoot = (player.lastShot + (1000 / player.shootingSpeed) < newDate);

		if((keysDown[32] || player.autoshoot === true) && canShoot) {
			bullets.shoot(player);
			player.lastShot = newDate;
		}

		if(keysDown[37]) player.updatex(player.x - player.speedx);
		if(keysDown[38]) player.updatey(player.y - player.speedy); // up
		if(keysDown[39]) player.updatex(player.x + player.speedx);
		if(keysDown[40]) player.updatey(player.y + player.speedy); // down


		if(keysDown[83]) {
			bullets.slowDown();
			enemies.slowDown();
			particles.slowDown();
		} else {
			bullets.resetSpeed();
			enemies.resetSpeed();
			particles.resetSpeed();
		}
	};

	var addControls = function(){
		$(document).keydown(function(event){
			keyboardDown(event.keyCode);
		});

		$(document).keyup(function(event){
			keyboardUp(event.keyCode);
		});

		canvas.addEventListener( 'pointerdown', onPointerDown, false );
		canvas.addEventListener( 'pointermove', onPointerDown, false );
	};

	var onPointerDown = function(e)
	{
		var touches = e.getPointerList();

		for(var i=0; i<touches.length; i++)
		{
			var touch = touches[i];
			player.update(touch.clientX, touch.clientY);
		}
	};

	var keyboardDown = function (keycode) {
		//log("key down: #" + keycode);

		keysDown[keycode] = 1;

		if(keycode === 65) player.toggleAutoShoot();
		if(keycode === 69) player.toggleShootingSpeed();
		if(keycode === 81) togglePause();
	};

	var keyboardUp = function(keycode) {
		keysDown[keycode] = null;
	};


	var togglePause = function(){
		pause = pause === true ? false : true;
	};
};