function World(element, params) {

	var theloop = undefined;
	
	if(params.fullscreen !== undefined && params.fullscreen) {
	
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		
	} else {
		
		this.width = (typeof params.width === 'number')? params.width : 500;
		this.height = (typeof params.height === 'number')? params.height : 400;
		
	}
	
	
	this.camera = (typeof params.camera === 'object')?params.camera:{x:0, y:0, z:0, zoom:4, scrollable:false, following: undefined};
	
	this.physics = (typeof params.physics === 'object')?params.physics: undefined;
	
	this.fullscreen = (typeof params.fullscreen === 'boolean')?params.fullscreen:false;
	this.backgroundColor = (typeof params.backgroundColor === 'string')?params.backgroundColor:'#1E3150';
	this.fps = (typeof params.fps === 'number')?params.fps:30;
	this.sun = (typeof params.sun === 'object')?params.sun:{position:-0.2};
	this.bounds = (typeof params.bounds === 'object')?params.bounds:[100, 100];
	this.showBounds = (typeof params.showBounds === 'boolean')?params.showBounds: false;
	this.gravity = (typeof params.gravity === 'number')?params.gravity: 0.0981;
	
	this.bodies = [];
	
	this.canvas = document.createElement('canvas');
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	this.canvas.style.width = this.width+'px';
	this.canvas.style.height = this.height+'px';
	this.ctx = this.canvas.getContext('2d');
			
	element.appendChild(this.canvas);
	
	window.addEventListener('resize', this.resize.bind(this));

}

World.prototype.add = function (body) {

	if(body === undefined) return;

	if(this.physics !== undefined) this.physics.apply(body);
	this.bodies.push(body);
	this.sortBodies();
	
	return body;

};

World.prototype.sortBodies = function () {
	
	this.bodies.sort(function(a, b){
		return (a.position.y + a.scale.y <= b.position.y) || (a.position.x - a.scale.x >= b.position.x);
	});
	
	this.bodies.sort(function(a, b){
		return a.position.z > b.position.z;
	});
	
};

World.prototype.clear = function () {
	
	this.ctx.clearRect(0, 0, this.width, this.height);
	
};

World.prototype.update = function () {
	
	for (var i = 0; i < this.bodies.length; i++) {
		
		if(this.bodies[i].physics !== undefined) this.bodies[i].physics(this.gravity);
		this.bodies[i].update();
				
	}
	
	this.sortBodies();
		
	if(this.camera.update !== undefined) this.camera.update();
	if(this.sun.update !== undefined) this.sun.update();
	
};

World.prototype.drawBounds = function() {
	
	this.ctx.lineWidth = 0.5;
	var cx = this.camera.x*5*this.camera.zoom,
		cy = this.camera.y*5*this.camera.zoom;
	
	for(i = -this.bounds[0]; i <= this.bounds[0]; i++) {
	
		var xStart = this.width/2 + i*5*this.camera.zoom - this.bounds[1]*5*this.camera.zoom;
		var yStart = this.height/2 + this.bounds[1]*6/2*this.camera.zoom + i*6/2*this.camera.zoom;
		
		var xEnd = this.width/2 + this.bounds[1]*5*this.camera.zoom + i*5*this.camera.zoom;
		var yEnd = this.height/2 - this.bounds[1]*6/2*this.camera.zoom + i*6/2*this.camera.zoom;
	
		this.ctx.strokeStyle = (i === 0)?'rgba(255,255,255,0.5)':'rgba(255,255,255,0.1)';
		this.ctx.beginPath();
		this.ctx.moveTo(xStart - (cx+cy), yStart - cx/5*3 + cy/5*3);
		this.ctx.lineTo(xEnd - (cx+cy), yEnd - cx/5*3 + cy/5*3);
		this.ctx.stroke();
		
	}
	
	for(i = -this.bounds[1]; i <= this.bounds[1]; i++) {
	
		var xStart = this.width/2 - this.bounds[0]*5*this.camera.zoom + i*5*this.camera.zoom;
		var yStart = this.height/2 - i*6/2*this.camera.zoom - this.bounds[0]*6/2*this.camera.zoom;
		
		var xEnd = this.width/2 + i*5*this.camera.zoom + this.bounds[0]*5*this.camera.zoom;
		var yEnd = this.height/2 - i*6/2*this.camera.zoom + this.bounds[0]*6/2*this.camera.zoom;
	
		this.ctx.strokeStyle = (i === 0)?'rgba(255,255,255,0.5)':'rgba(255,255,255,0.1)';
		this.ctx.beginPath();
		this.ctx.moveTo(xStart - (cx+cy), yStart - cx/5*3 + cy/5*3);
		this.ctx.lineTo(xEnd - (cx+cy), yEnd - cx/5*3 + cy/5*3);
		this.ctx.stroke();
		
	}
};

World.prototype.render = function () {

	this.clear();
		
	this.ctx.fillStyle = this.backgroundColor;
	this.ctx.fillRect(0, 0, this.width, this.height);
	
	if(this.showBounds) this.drawBounds();
			
	for (var i = 0; i < this.bodies.length; i++) {
		
		this.bodies[i].render(this.width, this.height, this.ctx, this.camera, this.sun.position);
		
	}
	
	if(this.sun.render !== undefined) this.sun.render(this.width, this.height, this.ctx, this.camera);
	
};

World.prototype.resize = function () {

	if(this.fullscreen){
	
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvas.style.width = this.width+'px';
		this.canvas.style.height = this.height+'px';
		
		this.render();
	
	}
	
};

World.prototype.loop = function () {

	theloop = requestAnimFrame(this.loop.bind(this));
	     
	now = Date.now();
	delta = now - then;
	     
	if (delta > interval) {
	        
		then = now - (delta % interval);
	    this.update();
	    this.render();
	
	}

};

World.prototype.run = function () {

	// shim layer with setTimeout fallback
	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       ||
	          window.webkitRequestAnimationFrame ||
	          window.mozRequestAnimationFrame    ||
	          function( callback ){
	            window.setTimeout(callback, 1000/this.fps);
	          };
	})();
	
	now = Date.now();
	then = Date.now();
	interval = 1000/this.fps;
	delta = 0;
	
	this.loop();

};

World.prototype.stop = function () {

	window.cancelAnimationFrame(theloop);
	
	this.render();
	this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
	this.ctx.fillRect(0, 0, this.width, this.height);

};

