var Display = function(options) {
	// Get display canvas and context
	this.dCanvas = document.getElementById(options.display.id);
	this.dContext = this.dCanvas.getContext('2d');
	
	// Create hidden canvas and context
	this.hCanvas = document.createElement('canvas');
	this.hContext = this.hCanvas.getContext('2d');
	
	// Set the width and height of the displayed canvas (in pixels)
	this.dCanvas.width = options.display.width * options.tiles.getWidth();
	this.dCanvas.height = options.display.height * options.tiles.getHeight();
	
	// Set the width and height of the hidden canvas (in pixels)
	this.hCanvas.width = this.dCanvas.width;
	this.hCanvas.height = this.dCanvas.height;
	
	// Get the display center tile and center pixel
	this.center = {
		tile: {
			x: Math.floor(options.display.width / 2),
			y: Math.floor(options.display.height / 2)
		},
		
		pixel: {
			x: Math.floor(this.dCanvas.width / 2),
			y: Math.floor(this.dCanvas.height / 2)
		}
	}
}
