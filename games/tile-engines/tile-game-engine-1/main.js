$(document).ready(function() {
	var options = {
		display: {
			id: 'gCanvas',
			width: 15,					// width of the displayed map window (in tiles)
			height: 15					// height of the displayed map window (in tiles)
		},
		
		world: {
			map: {
				path: '',
				width: 0,
				height: 0
			}
		},

		tiles: {
			tileset: {
				path: 'tiles/dg_grounds32.gif',	// path to tileset for world
				width: 9,						// width of tileset (in tiles)
				height: 19						// height of tileset (in tiles)
			},

			width: 32,							// width of a tile (in pixels)
			height: 32							// height of a tile (in pixels)
		},
		
		player: {
			ptileset: {
				path: 'tiles/dg_people32a.gif',	// path to tileset for people (players)
				width: 4,					// width of tileset (in tiles)
				height: 3					// height of tileset (in tiles)
			},
		
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
