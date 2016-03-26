function MouseListener() {
    
    this.pos = [];
    this.pressed = false;
 
    document.addEventListener("mousedown", this.mousedown.bind(this));
    document.addEventListener("mousemove", this.mousemove.bind(this));
    document.addEventListener("mouseup", this.mouseup.bind(this));
    
}

Mouse.prototype.mousedown = function(e) {
   this.pressed = true;
};

Mouse.prototype.mousemove = function(e) {
	this.pos = {x:e.clientX, y:e.clientY};
}

Mouse.prototype.mouseup = function(e) {
   this.pressed = false;
};

Mouse.prototype.hover = function(obj) {
	if(!this.pressed && 
	this.pos.x > obj.x && 
	this.pos.x < obj.x + obj.w && 
	this.pos.y > obj.y && 
	this.pos.y < obj.y + obj.h) return true;
}

Mouse.prototype.clicked = function(obj) {
	if(this.pressed && 
	this.pos.x > obj.x && 
	this.pos.x < obj.x + obj.w && 
	this.pos.y > obj.y && 
	this.pos.y < obj.y + obj.h) 
		return true;
	else {
		return false;
	}
}