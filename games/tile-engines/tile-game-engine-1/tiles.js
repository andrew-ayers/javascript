var Tiles = function(options) {
	// get the tile map engine options
	this._tileset = options.tileset;
	
	// Create image for tileset
	this._tileset.image = new Image();
	this._tileset.image.src = this._tileset.path;
	
	this._width = options.width;
	this._height = options.height;
	
	this.getWidth = function() {
		return this._width;
	}
	
	this.getHeight = function() {
		return this._height;
	}
	
	this.draw = function() {
	}
}
