function Sun() {
	
	this.position = -0.5;
	this.radius = 10;
	this.visible = true;
	this.realTime = false;
	this.distance = 300;
	this.dayCycle = 10;
	this.angle = 90;

}

Sun.prototype.update = function (fps) {

	if(this.realTime){
		
		var date = new Date();
		this.angle = ((date.getHours()+6)*360/24) + (Math.floor(100/60*date.getMinutes())/100*360/24);
					
	} else {
		
		this.angle += 360/60/this.dayCycle;
		
	}
	
	if(this.angle >= 360) this.angle = 0;
	
	this.position = (this.angle >= 180)? (this.angle/180*2) - 3: ((this.angle/180*2) - 1);
			
};

Sun.prototype.render = function (width, height, ctx, camera) {

	if(this.angle >= 180){
		ctx.fillStyle = 'rgba(255, 60, 60, '+(this.position-0.5)*0.2+')';
		ctx.fillRect(0, 0, width, height);
		
		ctx.fillStyle = 'rgba(255, 60, 60, '+(-(this.position+0.5)*0.3)+')';
		ctx.fillRect(0, 0, width, height);
		
	} else {
		ctx.fillStyle = 'rgba(20, 60, 80, 0.6)';
		ctx.fillRect(0, 0, width, height);
	}

	if(this.angle >= 180 && this.visible){

		var	cx = camera.x*5*camera.zoom,
			cy = camera.y*5*camera.zoom;
			
		//calc x and y position with radius of center
		x = width/2 + this.distance*camera.zoom * Math.cos(this.angle * Math.PI / 180);
		y = height/2 + this.distance*camera.zoom * Math.sin(this.angle * Math.PI / 180);
			
							
		//translate to center
		ctx.translate(x - cx - cy , y - cx/5*3 + cy/5*3);
		
		ctx.shadowColor = '#FFFCE1' // string
		ctx.shadowOffsetX = 0; // integer
		ctx.shadowOffsetY = 0; // integer
		ctx.shadowBlur = 10*camera.zoom;
	
		ctx.fillStyle = '#FFFCE1';
		ctx.beginPath();
		ctx.arc(0, 0, this.radius*camera.zoom, 0, 2 * Math.PI, false);
		ctx.fill();
		
		ctx.shadowColor = '' // string
		ctx.shadowOffsetX = 0; // integer
		ctx.shadowOffsetY = 0; // integer
		ctx.shadowBlur = 0;
		
		//translate to center
		ctx.translate(-(x - cx - cy), -(y - cx/5*3 + cy/5*3));
		
	} else {
		
		//nighttime
		var	cx = camera[0]*5*camera.zoom,
			cy = camera[1]*5*camera.zoom;
			
		//calc x and y position with radius of center
		x = width/2 + this.distance*camera.zoom * Math.cos((this.angle+180) * Math.PI / 180);
		y = height/2 + this.distance*camera.zoom * Math.sin((this.angle+180) * Math.PI / 180);
			
							
		//translate to center
		ctx.translate(x - cx - cy , y - cx/5*3 + cy/5*3);		
		
		ctx.fillStyle = '#F0F9FF';
		ctx.beginPath();
		ctx.arc(0, 0, this.radius/1.5*camera.zoom, 0, 2 * Math.PI, false);
		ctx.fill();
		
		ctx.shadowColor = '' // string
		ctx.shadowOffsetX = 0; // integer
		ctx.shadowOffsetY = 0; // integer
		ctx.shadowBlur = 0;
		
		//translate to center
		ctx.translate(-(x - cx - cy), -(y - cx/5*3 + cy/5*3));
		
	}
	

};