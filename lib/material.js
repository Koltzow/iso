function Material(options) {

	this.bounce = 0;
	this.resistance = 1;
	this.mass = 1;
	
	if(options !== undefined){
		
		if(options.bounce !== undefined) this.bounce = options.bounce;
		if(options.resistance !== undefined) this.resistance = options.resistance;
		if(options.mass !== undefined) this.mass = options.mass;
		
	}

}