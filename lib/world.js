var World = {

	create: function(element, params) {
	
		var theLoop = undefined;
	
		this.width = (params.fullscreen !== undefined)?window.innerWidth:500,
		this.height = (params.fullscreen !== undefined)?window.innerHeight:400,
		
		this.camera = (typeof params.camera === 'object')?params.camera:{x:0, y:0, z:0, zoom:4, scrollable:false, following: undefined};
		
		this.settings = {
			backgroundColor: (typeof params.backgroundColor === 'string')?params.backgroundColor:'#1E3150',
			fps: (typeof params.fps === 'number')?params.fps:30,
			sun: (typeof params.sun === 'object')?params.sun:{position:-0.2},
			physics: (typeof params.physics === 'object')?params.physics: undefined,
			bounds: (typeof params.bounds === 'object')?params.bounds:[100, 100],
			showBounds: (typeof params.showBounds === 'boolean')?params.showBounds: false
		};
		
		this.bodies = [];
		
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvas.style.width = this.width+'px';
		this.canvas.style.height = this.height+'px';
		this.ctx = this.canvas.getContext('2d');
				
		element.appendChild(this.canvas);
		
		window.addEventListener('resize', this.resize.bind(this));
		
		return this;
	
	},
	
	add: function (body) {
	
	
		if(this.settings.physics !== undefined) this.settings.physics.apply(body);
		this.bodies.push(body);
		this.sortBodies();
		
		return body;
	
	},
	
	sortBodies: function () {
		
		this.bodies.sort(function(a, b){
			return (a.position.y + a.scale.y <= b.position.y) || (a.position.x - a.scale.x >= b.position.x);
		});
		
		this.bodies.sort(function(a, b){
			return a.position.z > b.position.z;
		});
		
	},

	clear: function () {
		
		this.ctx.clearRect(0, 0, this.width, this.height);
		
	},
	
	update: function () {
		
		for (var i = 0; i < this.bodies.length; i++) {
			
			if(this.bodies[i].physics !== undefined) this.bodies[i].physics();
			this.bodies[i].update();
					
		}
		
		this.sortBodies();
			
		if(this.camera.update !== undefined) this.camera.update();
		
		if(this.settings.sun.update !== undefined) this.settings.sun.update();
		
	},
	
	drawBounds: function() {
		
		this.ctx.lineWidth = 0.5;
		var cx = this.camera.x*5*this.camera.zoom,
			cy = this.camera.y*5*this.camera.zoom;
		
		for(i = -this.settings.bounds[0]; i <= this.settings.bounds[0]; i++) {
		
			var xStart = this.width/2 + i*5*this.camera.zoom - this.settings.bounds[1]*5*this.camera.zoom;
			var yStart = this.height/2 + this.settings.bounds[1]*6/2*this.camera.zoom + i*6/2*this.camera.zoom;
			
			var xEnd = this.width/2 + this.settings.bounds[1]*5*this.camera.zoom + i*5*this.camera.zoom;
			var yEnd = this.height/2 - this.settings.bounds[1]*6/2*this.camera.zoom + i*6/2*this.camera.zoom;
		
			this.ctx.strokeStyle = (i === 0)?'rgba(255,255,255,0.5)':'rgba(255,255,255,0.1)';
			this.ctx.beginPath();
			this.ctx.moveTo(xStart - (cx+cy), yStart - cx/5*3 + cy/5*3);
			this.ctx.lineTo(xEnd - (cx+cy), yEnd - cx/5*3 + cy/5*3);
			this.ctx.stroke();
			
		}
		
		for(i = -this.settings.bounds[1]; i <= this.settings.bounds[1]; i++) {
		
			var xStart = this.width/2 - this.settings.bounds[0]*5*this.camera.zoom + i*5*this.camera.zoom;
			var yStart = this.height/2 - i*6/2*this.camera.zoom - this.settings.bounds[0]*6/2*this.camera.zoom;
			
			var xEnd = this.width/2 + i*5*this.camera.zoom + this.settings.bounds[0]*5*this.camera.zoom;
			var yEnd = this.height/2 - i*6/2*this.camera.zoom + this.settings.bounds[0]*6/2*this.camera.zoom;
		
			this.ctx.strokeStyle = (i === 0)?'rgba(255,255,255,0.5)':'rgba(255,255,255,0.1)';
			this.ctx.beginPath();
			this.ctx.moveTo(xStart - (cx+cy), yStart - cx/5*3 + cy/5*3);
			this.ctx.lineTo(xEnd - (cx+cy), yEnd - cx/5*3 + cy/5*3);
			this.ctx.stroke();
			
		}
	},
	
	render: function () {
	
		this.clear();
			
		this.ctx.fillStyle = this.settings.backgroundColor;
		this.ctx.fillRect(0, 0, this.width, this.height);
		
		if(this.settings.showBounds) this.drawBounds();
				
		for (var i = 0; i < this.bodies.length; i++) {
			
			this.bodies[i].render(this.width, this.height, this.ctx, this.camera, this.settings.sun.position);
			
		}
		
		if(this.settings.sun.render !== undefined) this.settings.sun.render(this.width, this.height, this.ctx, this.camera);
		
	},
	
	resize: function () {
		
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvas.style.width = this.width+'px';
		this.canvas.style.height = this.height+'px';
		
		this.render();
		
	},
	
	loop: function () {
	
		theLoop = requestAnimFrame(this.loop.bind(this));
		     
		now = Date.now();
		delta = now - then;
		     
		if (delta > interval) {
		        
			then = now - (delta % interval);
		    this.update();
		    this.render();
		
		}
	
	},
	
	run: function () {
	
		// shim layer with setTimeout fallback
		window.requestAnimFrame = (function(){
		  return  window.requestAnimationFrame       ||
		          window.webkitRequestAnimationFrame ||
		          window.mozRequestAnimationFrame    ||
		          function( callback ){
		            window.setTimeout(callback, 1000/this.settings.fps);
		          };
		})();
		
		now = Date.now();
		then = Date.now();
		interval = 1000/this.settings.fps;
		delta = 0;
		
		this.loop();
	
	},
	
	stop: function () {
	
		window.cancelAnimationFrame(theLoop);
		
		this.render();
		this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
		this.ctx.fillRect(0, 0, this.width, this.height);
	
	}
};

