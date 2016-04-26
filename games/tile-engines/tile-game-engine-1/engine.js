var Engine = function(options) {
	this._options = options;

	// Load World
	this._world = new World(this._options.world);
	
	// Get the Map of the World
	this._map = this._world.getMap();
	
	this._tiles = new Tiles(this._options.tiles);
	
	this._player = new Player(this._options.player);

	// Instantiate display object
	this._display = new Display({
		display: this._options.display,
		tiles: this._tiles
	});
	
	console.log(this._map);
	

	////////////////////////////////////////////////////////////////////////////
	
	this._loop = function() {
		//this._movePlayerPosition();
		
		//this._drawHiddenMapWindow();

		//this._copyWindowToDisplay();
		
		//console.log('yolo');
		this._tiles.draw();
		
		window.setTimeout(this._loop.bind(this), 1000 / 60); 
		
	}		
	
	/* 
	 * public module functions
	 */
	this.start = function() {
		this._loop();
	}

	
	
	/*
	// get the tile map engine options
	this._tileset = this._options.tileset;
	this._tiles = this._options.tiles;
	this._display = this._options.display;
	this._map = this._options.map;
	this._ptileset = this._options.ptileset;
	this._player = this._options.player;
	
	this._player.nx = this._player.x;
	this._player.ny = this._player.y;

	// Get the width and height of the entire map (in tiles)
	this._map.width = this._map.data[0].length;
	this._map.height = this._map.data.length;
	
	// Get display canvas and context
	this._dCanvas = document.getElementById(this._options.id);
	this._dContext = this._dCanvas.getContext('2d');
	
	// Set the width and height of the displayed canvas (in pixels)
	this._dCanvas.width = this._display.width * this._tiles.width;
	this._dCanvas.height = this._display.height * this._tiles.height;

	// Get the display center tile and center pixel
	this._display.center = {
		tile: {
			x: Math.floor(this._display.width / 2),
			y: Math.floor(this._display.height / 2)
		},
		
		pixel: {
			x: Math.floor(this._dCanvas.width / 2),
			y: Math.floor(this._dCanvas.height / 2)
		}
	}

	// Create hidden canvas and context
	this._hCanvas = document.createElement('canvas');
	this._hContext = this._hCanvas.getContext('2d');
	
	// Set the width and height of the hidden canvas (in pixels)
	this._hCanvas.width = this._dCanvas.width;
	this._hCanvas.height = this._dCanvas.height;
					
	// Create image for tileset
	this._tileset.image = new Image();
	this._tileset.image.src = this._tileset.path;

	// Create image for tileset
	this._ptileset.image = new Image();
	this._ptileset.image.src = this._ptileset.path;
						
	// Listen and dispatch for mouse click events on the displayed canvas
	this._dCanvas.addEventListener('click', this._mousehandler.bind(this), false);

	/* 
	 * private module functions
	 * /		 
	this._movePlayerPosition = function() {
		if (this._player.x < this._player.nx) this._player.x += this._player.dx;
		if (this._player.x > this._player.nx) this._player.x -= this._player.dx;
		if (this._player.y < this._player.ny) this._player.y += this._player.dy;
		if (this._player.y > this._player.ny) this._player.y -= this._player.dy;
	}
	
	this._drawHiddenMapWindow = function() {
		for (var y = 0; y < this._map.height; y++) {
			var my = (y - this._display.center.tile.y) + this._player.y;
			
			var row = null;
						
			if (my >= 0 && my < this._map.height) {
				row = this._map.data[my];
			}
							
			for (var x = 0; x < this._map.width; x++) {
				var mx = (x - this._display.center.tile.x) + this._player.x;
				
				var tile = 6;
				
				if (row != undefined) {
					if (mx >= 0 && mx < this._map.width) {
						switch (row[mx]) {
							case 0:
								tile = 33;
								break;
							case 1:
								tile = 9;
								break;
							case 2:
								tile = 18;
								break;
							case 3:
								tile = 12;
								break;
						}
					}
				}

				this._drawTileToHidden(this._hContext, this._tileset, tile, x * this._tiles.width, y * this._tiles.height);
				
			}
		}
		
		var px = this._display.center.tile.x, py = this._display.center.tile.y;
		
		this._drawTileToHidden(this._hContext, this._ptileset, this._player.tile, px * this._tiles.width, py * this._tiles.height);

	}		

	this._drawTileToHidden = function(context, tileset, tile, x, y) {
		var tx = tile % tileset.width * this._tiles.width;
		
		var ty = Math.floor(tile / tileset.width) * this._tiles.height;
		
		context.drawImage(
			tileset.image, 
			tx, 
			ty,
			this._tiles.width,
			this._tiles.height,
			x,
			y,
			this._tiles.width,
			this._tiles.height
		);			
	}

	this._copyWindowToDisplay = function() {
		this._dContext.drawImage(
			this._hCanvas, 
			0, 
			0,
			this._hCanvas.width,
			this._hCanvas.height,
			0,
			0,
			this._hCanvas.width,
			this._hCanvas.height
		);
	}

	////////////////////////////////////////////////////////////////
	
	this._doRender = function(self, cb) { 
		window.setTimeout(cb.bind(self), 1000 / 60); 
	}		
	
	this._mousehandler = function(event) {
		var mouseX = event.x - this._display.center.pixel.x;
		var mouseY = event.y - this._display.center.pixel.y;

		var tileX = Math.round(mouseX / this._tiles.width);
		var tileY = Math.round(mouseY / this._tiles.height);

		var px = this._player.x + tileX;
		var py = this._player.y + tileY;
		
		if (px < 0) px = 0;
		if (py < 0) py = 0;
		
		if (px > this._map.width - 1) px = this._map.width - 1;
		if (py > this._map.height - 1) py = this._map.height - 1;
		
		this._player.nx = px;
		this._player.ny = py;
	}

	this._draw = function() {
		this._movePlayerPosition();
		
		this._drawHiddenMapWindow();

		this._copyWindowToDisplay();
		
		this._doRender(this, this._draw);
	}		
	
	/* 
	 * public module functions
	 * /
	this.start = function() {
		this._draw();
	}
	*/
}

