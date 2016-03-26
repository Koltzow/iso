function Vector(options) {
	
	this.x = 0;
	this.y = 0;
	this.z = 0;
	
	if(options !== undefined){
		
		if(options.x !== undefined) this.x = options.x;
		if(options.y !== undefined) this.y = options.y;
		if(options.z !== undefined) this.z = options.z;
		
	}
	
};