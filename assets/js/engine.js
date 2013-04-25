Game.Engine = function() {

	var self = this;

	var player, bullets, enemies, particles, prizes, collision, sprite;

	var stageWidth, stageHeight;

	var canvas, ctx;

	var date, newDate, timePassed;

	var canSpawnEnemy, canSpawnPrize;

	var pause  = false;
	var slowmo = false;
	var debug  = false;

	var keysDown = [];

	var stats;

	this.init = function(){

		console.log("init...");

		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		document.getElementById('body').appendChild( stats.domElement );

		stageWidth  = $(window).width() - 2;
		stageHeight = $(window).height() - 2;

		canvas        = document.getElementById('scene');
		canvas.width  = stageWidth;
		canvas.height = stageHeight;
		ctx           = canvas.getContext('2d');

		sprite = new Game.Sprite();
		sprite.init();

		date      = new Date().getTime();

		bullets   = new Game.Bullets();
		particles = new Game.Particles();
		enemies   = new Game.Enemies();

		enemies.spriteCanvas = sprite.getCanvas();

		prizes    = new Game.Prizes();

		collision = new Game.Collision(stageWidth, stageHeight);
		collision.createGrid();

		player              = new Game.Player();
		player.spriteCanvas = sprite.getCanvas();
		player.color        = "#0000ff";
		player.type         = "player";

		player.update(canvas.width / 2 - player.width / 2, canvas.height - player.height);
		sprite.addShapeToSprite(player);

		setSizes();
		addControls();
		update();
	};

	var setSizes = function() {
		bullets.updateStage(stageWidth, stageHeight);
		particles.updateStage(stageWidth, stageHeight);
		enemies.updateStage(stageWidth, stageHeight);
		prizes.updateStage(stageWidth, stageHeight);
	};

	var update = function() {
		stats.begin();

		requestAnimFrame(update);

		if(pause) return;

		newDate = new Date().getTime();
		timePassed = newDate - date;
		date = newDate;

		spawnEnemies();
		spawnPrize();

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		handleEvents(newDate);

		bullets.update(timePassed);
		enemies.update(timePassed);
		particles.update(timePassed);
		prizes.update(timePassed);
		detectCollisions();

		drawScene();

		stats.end();
	};

	var spawnPrize = function() {
		canSpawnPrize = (prizes.lastSpawn + (1000 / prizes.spawningSpeed) < newDate);

		if(canSpawnPrize)
		{
			prizes.addPrize();
			prizes.lastSpawn = newDate;
		}
	};

	var spawnEnemies = function() {
		canSpawnEnemy = (enemies.lastSpawn + (1000 / enemies.spawningSpeed) < newDate);

		if(canSpawnEnemy)
		{
			var enemy = enemies.addEnemy(sprite);
			sprite.addShapeToSprite(enemy);
			enemies.lastSpawn = newDate;
		}
	};

	var drawScene = function() {
		bullets.render(ctx);
		enemies.render(ctx);
		particles.render(ctx);
		player.render(ctx);
		prizes.render(ctx);

		if(debug) {
			collision.drawGrid(ctx);
			sprite.showDebug();
		}
		else
		{
			sprite.hideDebug();
		}

	};

	var detectCollisions = function() {
		var allStageObjects = getAllObjects();

		collision.addObjects(allStageObjects);

		var colliding = collision.detect();
		var u = colliding.length;

		for (i = 0; i < u; i++) {
			//log(colliding[i].object1.type + " and " + colliding[i].object2.type + " are colliding...");

			if(colliding[i].object1.type == "bullet" && colliding[i].object2.type == "enemy")
			{
				particles.add(colliding[i].object2);
				enemies.kill(colliding[i].object2);
				bullets.kill(colliding[i].object1);
			}

			if((colliding[i].object1.type == "player" && colliding[i].object2.type == "prize") ||
				(colliding[i].object1.type == "bullet" && colliding[i].object2.type == "prize"))
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
		var data = "<h1 class='splash'>" + prize + "</h1>";

		$('body').append(data);
		var top = $(window).height() / 2 - $('.splash').height();

		$('.splash').css({
			'top': top + "px"
		});

		$('.splash').animate({
			'opacity': 0
		}, 3000, function() {
			$('.splash').remove();
		});

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
		var i   = 0;
		var u   = e.length;

		for (i = 0; i < u; i++) { arr.push(e[i]); }

		u = b.length;
		for (i = 0; i < u; i++) { arr.push(b[i]); }

		u = p.length;
		for (i = 0; i < u; i++) { arr.push(p[i]); }

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
		var touch = touches[0];
		player.update(touch.clientX - player.width / 2, touch.clientY - player.height);
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
};