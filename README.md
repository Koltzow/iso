# Iso
Iso is a simple javascript game engine for making isometric HTML5 games.

# Basic setup
Download the library and place the lib folder in your desired folder.

Start by creating a wrapper `<div id="game"></div>` to hold you game.

Then include the modules and library right before your `</body>`.

```html
<!-- MODULES -->
<script src="lib/shape.js" type="text/javascript"></script>
<script src="lib/world.js" type="text/javascript"></script>
<script src="lib/camera.js" type="text/javascript"></script>
<!-- LIBRARY -->
<script src="lib/iso.js" type="text/javascript"></script>

```

Next we instantiate the world

```javascript
var world = new World(document.getElementById('game'), {
	fullscreen: true,
	autoresize: true,
	bounds: [20, 20],
	showBounds: true,
	physics: new Physics(),
	camera: new Camera(),
	fps: 60
});
```

Let add a player object to the world. We will make a 2 block high cube and make it blue.

```javascript
var player = world.add(new Shape.cube({
	scale: {
		x: 1, 
		y: 1,
		z: 1
	},
	color: '#00aaff'
}));
```

Then we can start the game

```javascript
world.run();
```

It's that simple. You could also use it to render out a single frame by doing a render instead.

```javascript
world.render();
```