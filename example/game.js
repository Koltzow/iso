//simplyfy namespace
var World = ISO.World,
	Shape = ISO.Shape,
	Keyboard = ISO.Keyboard,
	Physics = ISO.Physics,
	Sun = ISO.Sun,
	Camera = ISO.Camera;

//create world	
var world = World.create(document.getElementById('game'), {
	fullscreen: true,
	autoresize: true,
	scrollable: true,
	bounds: [20, 20],
	showBounds: true,
	physics: Physics,
	camera: Camera,
	fps: 60
});

var player = world.add(Shape.cube({
	scale: {
		x: 1, 
		y: 1,
		z: 1
	},
	color: '#00aaff'
}));

//tell camera to follow player
world.camera.follow(player);

//set walking speed
var walkingspeed = 0.2;

//add to player update function
player.update = function () {

	var speedX = 0,
		speedY = 0;

	//left
	if(Keyboard.isPressed(37)) speedX -= walkingspeed;
		
	//up
	if(Keyboard.isPressed(38)) speedY += walkingspeed;
	
	//right
	if(Keyboard.isPressed(39)) speedX += walkingspeed;
	
	//down
	if(Keyboard.isPressed(40)) speedY -= walkingspeed;
	
	//jump
	if(Keyboard.isPressed(32) && player.position.z == 0) player.velocity.z = 1;
	
	if(speedX) player.velocity.x = speedX;
	if(speedY) player.velocity.y = speedY;
	
};

//render a single frame
world.run();
