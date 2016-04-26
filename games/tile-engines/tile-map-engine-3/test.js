$(document).ready(function() {
	var world = [];
	
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
		
		world[y] = row;
	}
	
	var options = {
		id: 'myCanvas',

		tileset: {
			path: 'dg_grounds32.gif',	// path to tileset for world
			width: 9,					// width of tileset (in tiles)
			height: 19					// height of tileset (in tiles)
		},

		tiles: {
			width: 32,					// width of a tile (in pixels)
			height: 32					// height of a tile (in pixels)
		},
		
		display: {
			width: 15,					// width of the displayed map window (in tiles)
			height: 15					// height of the displayed map window (in tiles)
		},
		
		map: {
			data: world					// map data
		},
		
		ptileset: {
			path: 'dg_people32a.gif',	// path to tileset for people (players)
			width: 4,					// width of tileset (in tiles)
			height: 3					// height of tileset (in tiles)
		},
		
		player: {
			tile: 10,
			x: 6,						// player x-position (in tiles)
			y: 6,						// player y-position (in tiles)
			dx: 1,						// player movement delta-x (in tiles)
			dy: 1						// player movement delta-y (in tiles)
		}
	}	
	
	//console.log(options);
		
	var myEngine = new Engine(options);
	
	myEngine.start();
});
