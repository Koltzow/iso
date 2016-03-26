//create keyboard
var keyboard = new Keyboard();

var camera = new Camera({
	scrollable: true
});

//create world
var world = new World(document.getElementById('game'), {
	showBounds: true,
	camera: camera
});

//create player
var player = world.add(new Shape('cube'));

//tell camera to follow player
world.camera.follow(player);

//set walking speed
var walkingspeed = 0.2;

//add player update function
player.update = function () {

	var speedX = 0,
		speedY = 0;

	//left
	if(keyboard.isPressed(37)) speedX -= walkingspeed;
		
	//up
	if(keyboard.isPressed(38)) speedY += walkingspeed;
	
	//right
	if(keyboard.isPressed(39)) speedX += walkingspeed;
	
	//down
	if(keyboard.isPressed(40)) speedY -= walkingspeed;
	
	//jump
	if(keyboard.isPressed(32) && player.position.z == 0) player.velocity.z = 1;
		
	if(speedX) player.velocity.x = speedX;
	if(speedY) player.velocity.y = speedY;
	
};

//render a single frame
world.run();