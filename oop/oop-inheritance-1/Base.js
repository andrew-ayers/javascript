var Base = function(options) {
	var obj = this;
	
	// Set the "super" options here
	obj._options = options;

	// Just a random method to show the operation of a defined
	// base method when called from the original child
	this.testFunc = function() {
		console.log('yolo');
	}
	
	return obj;
}
