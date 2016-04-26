// Player Class
var Player = function(options) {
	// Player inherits methods and properties from Base
	var obj = this.inherits(Base, options);

	// Set Player options (note that this will be automatically
	// merged with any passed in options and options from other
	// inherited classes)
	obj._options = {bob:1234};
		
	// Set the default position
	obj._position = {x:0, y:0}
	
	// Get the current position
	obj.getPosition = function() {
		return this._position;
	}
	
	// Set a new position
	obj.setPosition = function(position) {
		this._position = position;
	}
	
	// Move to a new position
	obj.movePosition = function(x, y) {
		this._position = {x: x, y: y};
	}		

	return obj;		
}
