function Rigidbody(options) {
	
	this.position = -0.5;
	this.radius = 10;
	this.visible = true;
	this.realtime = false;
	this.distance = 300;
	this.daycycle = 10;
	this.angle = 90;
	
	if(options){
		
		if (options.position !== undefined) this.position = options.position;
		if (options.radius !== undefined) this.radius = options.radius;
		if (options.visivle !== undefined) this.visible = options.visible;
		if (options.realtime !== undefined) this.realtime = options.realtime;
		if (options.distance !== undefined) this.distance = options.distance;
		if (options.daycycle !== undefined) this.daycycle = options.daycycle;
	
	}

}

Rigidbody.prototype.update = function () {

	
				
};