function Camera(options) {
	
	this.position = {
		x: 0,
		y: 0,
		z: 0
	};
	
	this.forward = {
		x: 0.612375,
		y: 0.612375, 
		z: -0.50000
	};
	
	this.distance = 5;
	this.scrollable = false;
	this.target = undefined;
	
	if(options !== undefined && typeof options === 'object'){
			
		if (options.position !== undefined) this.position = options.position;
		if (options.distance !== undefined) this.distance = options.distance;
		if (options.scrollable !== undefined) this.scrollable = options.scrollable;
		
	}
		
	if(this.scrollable) {
		window.addEventListener('mousewheel', this.scrollZoom.bind(this));
	}
		
};

Camera.prototype.update = function () {

	if(this.target !== undefined){
		this.setPosition( this.target.position );
	}

};

Camera.prototype.scrollZoom = function (event) {
	
	this.setDistance(this.distance-event.deltaY/20);
	
};


Camera.prototype.follow = function (obj) {
	
	if(obj !== undefined && typeof obj === 'object') this.target = obj;
	
};

Camera.prototype.unfollow = function () {
	
	this.target = undefined;
	
};

Camera.prototype.setDistance = function (distance) {

	if(distance !== undefined && typeof distance === 'number' && distance > 1) this.distance = distance;
	
};

Camera.prototype.setPosition = function (point) {
	
	if(point !== undefined && typeof point === 'object') this.position = point;
	
};

Camera.prototype.setPositionX = function (x) {

	if(x !== undefined && typeof x === 'number') this.position.x = x;

};

Camera.prototype.setPositionY = function (y) {

	if(y !== undefined && typeof y === 'number') this.position.y = y;

};

Camera.prototype.setPositionZ = function (z) {

	if(z !== undefined && typeof z === 'number') this.position.z = z;

};