var Keyboard = {
    
    pressedKeys: [],
 
    keydown: function(e) {
        this.pressedKeys[e.keyCode] = true;
    },
 
    keyup: function(e) {
        this.pressedKeys[e.keyCode] = false;
    },
    
   	isPressed: function(key){
        return this.pressedKeys[key] ? true : false;
    },
    
    addKeyPressListener: function(keyCode, callback){
        
    	if(typeof keyCode == 'string'){
    	
    		var code = undefined;
    		
    		switch (keyCode) {
    			case 'left':
    				code = 37;
    				break;
    			case 'up':
    				code = 38;
    				break;
    			case 'right':
    				code = 39;
    				break;
    			case 'down':
    				code = 40;
    				break;
    		}
    	
    		if(code !== undefined){
    	
	    		document.addEventListener('keydown', function(e) {
	    			if (e.keyCode === code)
	    				callback(e);
	    		});
	    		
	    	}
    		
    	}
    	
    	if(typeof keyCode == 'number'){
    
			document.addEventListener('keypress', function(e) {
				if (e.keyCode === keyCode)
					callback(e);
			});
        
       	}
    }

};

document.addEventListener("keydown", Keyboard.keydown.bind(Keyboard));
document.addEventListener("keyup", Keyboard.keyup.bind(Keyboard));