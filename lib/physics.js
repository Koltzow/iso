var Physics = {
	gravity: 0.0981,

	apply: function (body) {

		var gravity = this.gravity;
		
		body.velocity = {};
		
		body.velocity.z = 0;
		body.velocity.x = 0;
		body.velocity.y = 0;
				
		body.physics = function () {
											
			body.velocity.z -= gravity;
			
			body.position.x += body.velocity.x;
			body.position.y += body.velocity.y;
			body.position.z += body.velocity.z;
			
			
			if(body.position.z < 0){
				
				body.velocity.z *= -0.2;
				body.velocity.x *= 0.2;
				body.velocity.y *= 0.2;
				body.position.z = 0;
				
			} 		
			
		};
					
		body.applyForce = function (x, y, z) {
		
			if(x !== undefined && y !== undefined && z !== undefined){
				body.velocity.x += x;
				body.velocity.y += y;
				body.velocity.z += z;
			}
							
		};
		
		body.applyForceX = function (x) {
			if(x) body.velocity.x += x;
		};
		
		body.applyForceY = function (y) {
			if(y) body.velocity.y += y;
		};
		
		body.applyForceZ = function (z) {
			if(z) body.velocity.z += z;
		};
	
	}

};