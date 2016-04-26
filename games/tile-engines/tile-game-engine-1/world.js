var World = function(options) {
	
	this._map = {};
	this._map.data = [];
	
	for (var y = 0; y < 128; y++) {
		var row = [];
		for (var x = 0; x < 128; x++) {
			/*
			var x2 = Math.pow(x - 64, 2);
			var y2 = Math.pow(y - 64, 2); 
			
			var v = (Math.sin(x2 + y2) / (x2 + y2)) * 10000;
			if (v < 0) v = 0;
			
			row[x] = Math.floor(v);
			*/
			
			row[x] = Math.floor(Math.random() * 4);
		}
		
		this._map.data[y] = row;
	}	
	
	// Get the width and height of the entire map (in tiles)
	this._map.width = this._map.data[0].length;
	this._map.height = this._map.data.length;

	
	this.getMap = function() {
		return this._map;
	}
}
