// Rotate shape around the z-axis
rotateZ3D = function(theta, nodes) {
    var sin_t = Math.sin(theta);
    var cos_t = Math.cos(theta);
    
    for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        var x = node[0];
        var y = node[1];
        node[0] = x * cos_t - y * sin_t;
        node[1] = y * cos_t + x * sin_t;
    }
};

var rotateY3D = function(theta, nodes) {
    var sin_t = Math.sin(theta);
    var cos_t = Math.cos(theta);
    
    for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        var x = node[0];
        var z = node[2];
        node[0] = x * cos_t - z * sin_t;
        node[2] = z * cos_t + x * sin_t;
    }
};

var rotateX3D = function(theta, nodes) {
    var sin_t = Math.sin(theta);
    var cos_t = Math.cos(theta);
    
    for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        var y = node[1];
        var z = node[2];
        node[1] = y * cos_t - z * sin_t;
        node[2] = z * cos_t + y * sin_t;
    }
};

var Shape = {};

Shape.cubeoid = function (options) {

	var sx = (options.scale !== undefined && options.scale.x !== undefined)?options.scale.x:1,
		sy = (options.scale !== undefined && options.scale.y !== undefined)?options.scale.y:1,
		sz = (options.scale !== undefined && options.scale.z !== undefined)?options.scale.z:1,
		px = (options.position !== undefined && options.position.x !== undefined)?options.position.x:0,
		py = (options.position !== undefined && options.position.y !== undefined)?options.position.y:0,
		pz = (options.position !== undefined && options.position.z !== undefined)?options.position.z:0;

	var cubeoid = {
	
		scale: {
			x: sx,
			y: sy,
			z: sz
		},
		
		position: {
			x: px,
			y: py,
			z: pz
		},
		
		rotation: {
			x: 0,
			y: 0,
			z: 0
		},
	
		nodes: [
			[px-sx/2,   py-sz/2,   pz-sy/2],
			[px-sx/2,   py-sz/2,   pz-sy/2+sy],
			[px-sx/2,   py-sz/2+sz, pz-sy/2],
			[px-sx/2,   py-sz/2+sz, pz-sy/2+sy],
			[px-sx/2+sx, py-sz/2,   pz-sy/2],
			[px-sx/2+sx, py-sz/2,   pz-sy/2+sy],
			[px-sx/2+sx, py-sz/2+sz, pz-sy/2],
			[px-sx/2+sx, py-sz/2+sz, pz-sy/2+sy]
		],
		
		edges:	[
			[0, 1], [1, 3], [3, 2], [2, 0],
		    [4, 5], [5, 7], [7, 6], [6, 4],
		    [0, 4], [1, 5], [2, 6], [3, 7]
		],
		        
		update: function () {
		
			//rotateX3D(-35.264, this.nodes);
			//rotateY3D(0.01, this.nodes);
			//rotateX3D(35.264, this.nodes);
		
		},
		
		render: function (width, height, ctx, zoom) {
		
			//translate position
			ctx.translate(width/2, height/2);
			
			var ad = 7;
			
		    for (var e = 0; e < this.edges.length; e++) {
		        var n0 = this.edges[e][0];
		        var n1 = this.edges[e][1];
		        var node0 = this.nodes[n0];
		        var node1 = this.nodes[n1];
		        
		        ctx.strokeStyle = 'white';
		        ctx.beginPath();
		        ctx.moveTo( node0[0]*zoom*ad, node0[1]*zoom*ad);
		        ctx.lineTo( node1[0]*zoom*ad, node1[1]*zoom*ad);
		        ctx.stroke();
		    }
		    
		    //translate back
		    ctx.translate(-(width/2), -(height/2)); 
		
		}
	
	};
	
	rotateY3D(44.7, cubeoid.nodes);
	rotateX3D(35.264, cubeoid.nodes);
	
		
			
	return cubeoid;

};

Shape.cube = function(options) {

	var cube = {

		//add some additional checks later
		color: (options.color !== undefined)?options.color:'#cccccc',
		scale: {
			x: (options.scale !== undefined && options.scale.x !== undefined)?options.scale.x:1,
			y: (options.scale !== undefined && options.scale.y !== undefined)?options.scale.y:1,
			z: (options.scale !== undefined && options.scale.z !== undefined)?options.scale.z:1
		},
		position: {
			x: (options.position !== undefined && options.position.x !== undefined)?options.position.x:0,
			y: (options.position !== undefined && options.position.y !== undefined)?options.position.y:0,
			z: (options.position !== undefined && options.position.z !== undefined)?options.position.z:0
		},
		velocity: {
			x: (options.velocity !== undefined && options.velocity.x !== undefined)?options.velocity.x:0,
			y: (options.velocity !== undefined && options.velocity.y !== undefined)?options.velocity.y:0,
			z: (options.valocity !== undefined && options.velocity.z !== undefined)?options.velocity.z:0
		},
		
		shadeColor: function (color, percent) {
		
			var f = parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
		    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
		},
		
		setPosition: function (x, y, z) {
			
			if(x && y && z){
				this.position.x += x;
				this.position.y += y;
				this.position.z += z;
			}
			
		},
		
		setPositionX: function (x) {
			if(x)this.velocity.x += x;
		},
		
		setPositionY: function (y) {
			if(y)this.velocity.y += y;
		},
		
		setPositionZ: function (z) {
			if(z)this.velocity.z += z;
		},
		
		update: function () {},
		
		render: function (width, height, ctx, camera, sun) {
		
			var sx = this.scale.x*5*camera.zoom,
				sy = this.scale.y*5*camera.zoom,
				sz = this.scale.z*6*camera.zoom,
				px = this.position.x*5*camera.zoom,
				py = this.position.y*5*camera.zoom,
				pz = this.position.z*6*camera.zoom,
				cx = camera.x*5*camera.zoom,
				cy = camera.y*5*camera.zoom;
								
			//translate to center
			ctx.translate(width/2 + px + py - cx - cy, height/2 + px/5*3 - py/5*3 - cx/5*3 + cy/5*3 - pz);
			
			//draw shadow
			ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
			ctx.beginPath();
			ctx.moveTo( pz, 0 + pz);
			ctx.lineTo( -sx + pz, -( sx/5*3) + pz);
			ctx.lineTo( sy - sx + +pz, -( sy/5*3 + sx/5*3) + pz);
			ctx.lineTo( sy - sx + pz + sz, -( sy/5*3 + sx/5*3) + pz);
			ctx.lineTo( sy + pz + sz, -(sy/5*3) + pz);
			ctx.lineTo( pz + sz, pz);
			ctx.fill();
			
			//draw right and left side if we have height, if not draw plain
			if(this.scale.z > 0){
				
				if(this.scale.x > 0){
					//draw left side
					ctx.fillStyle = this.shadeColor(this.color, -sun*0.8);
					ctx.beginPath();
					ctx.moveTo(0,0);
					ctx.lineTo( -sx, -sx/5*3 );
					ctx.lineTo( -sx, -( sx/5*3 + sz ));
					ctx.lineTo( sy - sx, -( sy/5*3 + sx/5*3 + sz ) );
					ctx.lineTo( sy, -( sy/5*3 + sz ));
					ctx.fill();
				}
				
				if(this.scale.y > 0){
					//draw right side
					ctx.fillStyle = this.shadeColor(this.color, sun*0.8);
					ctx.beginPath();
					ctx.moveTo(0,0);
					ctx.lineTo( sy, -sy/5*3 );
					ctx.lineTo( sy, -( sy/5*3 + sz ));
					ctx.lineTo(0, -sz );
					ctx.fill();
				}
			}
			
			//draw top only if we have both a width and depth
			if(this.scale.y > 0 && this.scale.x > 0){
			
				//draw top
				ctx.fillStyle = this.shadeColor(this.color, -sun*sun+ 0.5);
				ctx.beginPath();
				ctx.moveTo( 0, -sz );
				ctx.lineTo( -sx, -( sx/5*3 + sz ));
				ctx.lineTo( sy - sx, -( sy/5*3 + sx/5*3 + sz ));
				ctx.lineTo( sy, -(sy/5*3 + sz ));
				ctx.fill();
				
			}
			
			
			
			
			
			ctx.translate( -(width/2 + px + py - cx - cy), -(height/2 + px/5*3 - py/5*3 - cx/5*3 + cy/5*3 - pz));
			
		}
		
	};
			
	return cube;
		
};

Shape.pyramid = function(options) {
	
	var pyramid = {

		//add some additional checks later
		color: (options.color)?options.color:'#cccccc',
		scale: {
			x: (options.scale !== undefined && options.scale.x !== undefined)?options.scale.x:1,
			y: (options.scale !== undefined && options.scale.y !== undefined)?options.scale.y:1,
			z: (options.scale !== undefined && options.scale.z !== undefined)?options.scale.z:1
		},
		position: {
			x: (options.position !== undefined && options.position.x !== undefined)?options.position.x:0,
			y: (options.position !== undefined && options.position.y !== undefined)?options.position.y:0,
			z: (options.position !== undefined && options.position.z !== undefined)?options.position.z:0
		},
		velocity: {
			x: (options.velocity !== undefined && options.velocity.x !== undefined)?options.velocity.x:0,
			y: (options.velocity !== undefined && options.velocity.y !== undefined)?options.velocity.y:0,
			z: (options.valocity !== undefined && options.velocity.z !== undefined)?options.velocity.z:0
		},
		
		shadeColor: function (color, percent) {
		
			var f = parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
		    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
		},
		
		setPosition: function (x, y, z) {
			
			if(typeof x == 'number' && typeof y == 'number' && typeof z == 'number'){
				this.position.x = x;
				this.position.y = y;
				this.position.z = z;
			}
			
		},
		
		setPositionX: function (x) {
			if(typeof x == 'number') this.position.x = x;
		},
		
		setPositionY: function (y) {
			if(typeof y == 'number') this.position.y = y;
		},
		
		setPositionZ: function (z) {
			if(typeof z == 'number') this.position.z = z;
		},
		
		update: function () {},
		
		render: function (width, height, ctx, camera, sun) {
			
			var sx = this.scale.x*5*camera.zoom,
				sy = this.scale.y*5*camera.zoom,
				sz = this.scale.z*6*camera.zoom,
				px = this.position.x*5*camera.zoom,
				py = this.position.y*5*camera.zoom,
				pz = this.position.z*6*camera.zoom,
				cx = camera.x*5*camera.zoom,
				cy = camera.y*5*camera.zoom;
								
			//translate to center
			ctx.translate(width/2 + px + py - cx - cy, height/2 + px/5*3 - py/5*3 - cx/5*3 + cy/5*3 - pz);
			
			
			//draw right and left side if we have height
			if(this.scale.z > 0){
			
				if(this.scale.y > 0 && this.scale.x > 0){
					
					//draw back left side
					ctx.fillStyle = this.shadeColor(this.color, -sun*0.2);
					ctx.beginPath();
					ctx.moveTo(-sx, -sx/5*3);
					ctx.lineTo( sy - sx, -( sy/5*3 + sx/5*3 ));
					ctx.lineTo( sy, -sy/5*3);
					ctx.fill();
					
					//draw back right side
					ctx.fillStyle = this.shadeColor(this.color, sun*0.3);
					ctx.beginPath();
					ctx.moveTo(0, 0);
					ctx.lineTo( sy - sx, -( sy/5*3 + sx/5*3 ));
					ctx.lineTo( sy, -sy/5*3);
					ctx.fill();
					
				}
				
				if(this.scale.x > -1){
									
					//draw left side
					ctx.fillStyle = this.shadeColor(this.color, -sun*0.6);
					ctx.beginPath();
					ctx.moveTo(0,0);
					ctx.lineTo(-sx, -sx/5*3);
					ctx.lineTo( (sy - sx)/2, -( sy/5*3 + sx/5*3 )/2 - sz);
					ctx.lineTo(sy, -sy/5*3);
					ctx.fill();
					
				}
				
				if(this.scale.y > 0){
				
					//draw right side
					ctx.fillStyle = this.shadeColor(this.color, sun*0.6);
					ctx.beginPath();
					ctx.moveTo(0,0);
					ctx.lineTo( (sy - sx)/2, -( sy/5*3 + sx/5*3 )/2 - sz);
					ctx.lineTo(sy, -sy/5*3);
					
					ctx.fill();
				
				}
				
				
			} else {
				
				//draw plain
				ctx.fillStyle = this.shadeColor(this.color, sun*sun*1);
				ctx.beginPath();
				ctx.moveTo( 0, 0 );
				ctx.lineTo( -sx, -sx/5*3);
				ctx.lineTo( sy - sx, -( sy/5*3 + sx/5*3 ));
				ctx.lineTo( sy, -sy/5*3);
				ctx.fill();
				
			}
						
			
			ctx.translate( -(width/2 + px + py - cx - cy), -(height/2 + px/5*3 - py/5*3 - cx/5*3 + cy/5*3 - pz));
			
		}
	
	};
	
	return pyramid;

};

Shape.plain = function(options) {

	var plain = {
	
		//add some additional checks later
		color: (options.color)?options.color:'#cccccc',
		scale: {
			x: (options.scale !== undefined && options.scale.x !== undefined)?options.scale.x:1,
			y: (options.scale !== undefined && options.scale.y !== undefined)?options.scale.y:1,
			z: (options.scale !== undefined && options.scale.z !== undefined)?options.scale.z:1
		},
		position: {
			x: (options.position !== undefined && options.position.x !== undefined)?options.position.x:0,
			y: (options.position !== undefined && options.position.y !== undefined)?options.position.y:0,
			z: (options.position !== undefined && options.position.z !== undefined)?options.position.z:0
		},
		velocity: {
			x: (options.velocity !== undefined && options.velocity.x !== undefined)?options.velocity.x:0,
			y: (options.velocity !== undefined && options.velocity.y !== undefined)?options.velocity.y:0,
			z: (options.valocity !== undefined && options.velocity.z !== undefined)?options.velocity.z:0
		},
		
		shadeColor: function (color, percent) {
		
			var f = parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
		    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
		},
		
		setPosition: function (x, y, z) {
			
			if(typeof x == 'number' && typeof y == 'number' && typeof z == 'number'){
				this.position.x = x;
				this.position.y = y;
				this.position.z = z;
			}
			
		},
		
		setPositionX: function (x) {
			if(typeof x == 'number') this.position.x = x;
		},
		
		setPositionY: function (y) {
			if(typeof y == 'number') this.position.y = y;
		},
		
		setPositionZ: function (z) {
			if(typeof z == 'number') this.position.z = z;
		},
	
		update: function () {},
	
		render: function (width, height, ctx, camera, sun) {
		
			var sx = this.scale.x*5*camera.zoom,
				sy = this.scale.y*5*camera.zoom,
				sz = this.scale.z*6*camera.zoom,
				px = this.position.x*5*camera.zoom,
				py = this.position.y*5*camera.zoom,
				pz = this.position.z*6*camera.zoom,
				cx = camera.x*5*camera.zoom,
				cy = camera.y*5*camera.zoom;
													
			//translate to center
			ctx.translate( window.innerWidth/2 + sx + sy - cx - cy, width/2 + this.x*2*angle*zoom - this.y*2*angle*zoom - camera[0]*2*zoom*angle + camera[1]*2*zoom*angle);
			
			//draw top only if we have both a width and depth
			if(this.d > 0 && this.w > 0){
				
				//draw top
				ctx.fillStyle = this.shadeColor(this.c, -sun*sun+ 0.5);
				ctx.beginPath();
				ctx.moveTo(0,0);
				ctx.lineTo(-this.w*4*zoom, -(this.w*2*angle*zoom));
				ctx.lineTo(this.d*4*zoom-this.w*4*zoom, -(this.d*2*angle*zoom + this.w*2*angle*zoom) );
				ctx.lineTo(this.d*4*zoom, -(this.d*2*angle*zoom));
				ctx.fill();
				
			}
			
			ctx.translate(-( window.innerWidth/2 + this.x*4*zoom + this.y*4*zoom - camera[0]*4*zoom - camera[1]*4*zoom), -( window.innerHeight/2 + this.x*2*angle*zoom - this.y*2*angle*zoom - camera[0]*2*angle*zoom + camera[1]*2*zoom*angle));
			
		}
	};
	
	return plain;
		
};