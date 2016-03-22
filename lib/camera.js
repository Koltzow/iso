function Camera() {
	
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.zoom = 5;
	this.scrollable = false;
	this.following = undefined;
		
};

Camera.prototype.update = function () {

	if(this.following !== undefined && typeof this.following === 'object'){
		this.setPosition( this.following.position.x, this.following.position.y, this.following.position.z );
	}

};

Camera.prototype.scrollZoom = function (event) {
	
	this.setZoom(this.camera.zoom+event.deltaY/20);
	
},


Camera.prototype.follow = function (obj) {
	
	this.following = obj;
	
};

Camera.prototype.unfollow = function () {
	
	this.following = undefined;
	
};

Camera.prototype.setZoom = function (zoom) {

	this.zoom = zoom;

};

Camera.prototype.setPositionX = function (x) {

	this.x = x;

};

Camera.prototype.setPositionY = function (y) {

	this.y = y;

};

Camera.prototype.setPositionZ = function (z) {

	this.z = z;

};

Camera.prototype.setPosition = function (x, y, z) {
	
	this.x = x;
	this.y = y;
	this.z = z;
	
};

Camera.prototype.create = function (params) {

	if(params !== undefined && typeof params === 'object' && params.length > 0){
		
		this.x = (params.x !== undefined) ? params.x : this.x;
		this.y = (params.y !== undefined) ? params.y : this.y;
		this.z = (params.z !== undefined) ? params.z : this.z;
		this.zoom = (params.zoom !== undefined) ? params.zoom : this.zoom;
		this.scrollable = (params.scrollable !== undefined) ? params.scrollable : this.scrollable;
		
	}
	
	if(this.scrollable) {
		console.log('test');
		window.addEventListener('mousewheel', this.scrollZoom.bind(this));
	}
	
	return this;

};