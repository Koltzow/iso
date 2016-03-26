function Camera(options) {
	
	this.position = {
		x: 0,
		y: 0,
		z: 0
	};
	this.zoom = 5;
	this.scrollable = false;
	this.following = undefined;
	
	if(options !== undefined && typeof options === 'object'){
			
		if (options.position !== undefined) this.position = options.position;
		if (options.zoom !== undefined) this.zoom = options.zoom;
		if (options.scrollable !== undefined) this.scrollable = options.scrollable;
		
	}
		
	if(this.scrollable) {
		window.addEventListener('mousewheel', this.scrollZoom.bind(this));
	}
		
};

Camera.prototype.update = function () {

	if(this.following !== undefined){
		this.setPosition( this.following.position );
	}

};

Camera.prototype.scrollZoom = function (event) {
	
	this.setZoom(this.zoom+event.deltaY/20);
	
};


Camera.prototype.follow = function (obj) {
	
	if(obj !== undefined && typeof obj === 'object') this.following = obj;
	
};

Camera.prototype.unfollow = function () {
	
	this.following = undefined;
	
};

Camera.prototype.setZoom = function (zoom) {

	if(zoom !== undefined && typeof zoom === 'number' && zoom > 1) this.zoom = zoom;
	
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

Camera.prototype.setPosition = function (point) {
	
	if(point !== undefined && typeof point === 'object') this.position = point;
	
};