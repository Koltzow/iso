function MouseListener() {
    
    this.pos = [];
    this.pressed = false;
 
    this.mousedown = function(e) {
        this.pressed = true;
    };
    
    this.mousemove = function(e) {
    	this.pos = {x:e.clientX, y:e.clientY};
    }
 
    this.mouseup = function(e) {
        this.pressed = false;
    };
    
    this.hover = function(obj) {
    	if(!this.pressed && 
    	this.pos.x > obj.x && 
    	this.pos.x < obj.x + obj.w && 
    	this.pos.y > obj.y && 
    	this.pos.y < obj.y + obj.h) return true;
    }
    
    this.clicked = function(obj) {
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
 
    document.addEventListener("mousedown", this.mousedown.bind(this));
    document.addEventListener("mousemove", this.mousemove.bind(this));
    document.addEventListener("mouseup", this.mouseup.bind(this));
    
}