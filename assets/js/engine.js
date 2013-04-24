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

	var pause  = false;
	var slowmo = false;
	var debug  = false;

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
		player.color = "#0000ff";
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
		if(debug) collision.drawGrid(ctx);
	};

	var detectCollisions = function() {
		var arr = getAllObjects();

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

			if(colliding[i].object1.type == "player" && colliding[i].object2.type == "prize")
			{
				var prize = colliding[i].object2.prizes[colliding[i].object2.prize];

				givePrize(prize);
				particles.add(colliding[i].object2);
				prizes.kill(colliding[i].object2);
			}

			if(colliding[i].object1.type == "player" && colliding[i].object2.type == "enemy")
			{
				log("game over");
			}
		}
	};

	var givePrize = function(prize) {
		log(prize);

		switch(prize) {
			case 'speedammo' :
				//player.increaseShootingSpeed();
				break;
			case 'slowmotion' :
				//slowDown();
				break;
			case 'ammox3' :

				break;
			case 'ammox5':

				break;
			case 'shield':

				break;
		}
	};

	var getAllObjects = function() {
		var e = enemies.getItems();
		var b = bullets.getItems();
		var p = prizes.getItems();

		var arr = [];
		var i = 0;
		for (i = 0; i < e.length; i++) { arr.push(e[i]); }
		for (i = 0; i < b.length; i++) { arr.push(b[i]); }
		for (i = 0; i < p.length; i++) { arr.push(p[i]); }
		arr.push(player);

		return arr;
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
	};


	var toggleSpeed = function(){
		if(slowmo === true)
		{
			slowmo = false;
			resetSpeed();
		}
		else
		{
			slowmo = true;
			slowDown();
		}
	};

	var slowDown = function(){
		bullets.slowDown();
		enemies.slowDown();
		particles.slowDown();
		prizes.slowDown();
	};

	var resetSpeed = function(){
		bullets.resetSpeed();
		enemies.resetSpeed();
		particles.resetSpeed();
		prizes.resetSpeed();
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
			player.update(touch.clientX - player.width / 2, touch.clientY - player.height);
		}
	};

	var keyboardDown = function (keycode) {
		//log("key down: #" + keycode);

		keysDown[keycode] = 1;

		if(keycode === 65) player.toggleAutoShoot(); // a
		if(keycode === 69) player.toggleShootingSpeed(); // e
		if(keycode === 81) togglePause(); // q
		if(keycode === 86) toggleDebug(); // v
		if(keycode === 83) toggleSpeed(); // s
	};

	var keyboardUp = function(keycode) {
		keysDown[keycode] = null;
	};


	var togglePause = function(){
		pause = pause === true ? false : true;
	};

	var toggleDebug = function() {
		debug = debug === true ? false : true;
	};
};