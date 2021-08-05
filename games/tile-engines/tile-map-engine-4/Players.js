// Player Class
var Player = function(options) {
	if (options != undefined) {
		this._options = options;
		
		this._position = {x:0, y:0}

/*
		this.prototype.defineProperty(this, "position", {
			get: function() {
				return this._position;
			}
		});

		//$.extend(this, new Base());		


		/*
		this.prototype.__defineGetter__("position", function() {
			console.log('getter');
			return this._position;
		});

		/*		
		this.__defineSetter__("position", function(position) {
			console.log('setter');
			this._position = position;
		});
		*/
		
		return this;
	}
}
/*
*/

// Real Player Class
var RealPlayer = function(options) {
	if (options != undefined) {
		this._options = options;
		
		$.extend(this, new Player(this._options));
		
		this.moveTo = function(x, y) {
			this.position = {x: x, y: y}
		}		
		
		return this;
	}
}

/*
Object.defineProperty(Player.prototype, "position", {
	get: function() {
		//console.log('getter');
		return this._position;
	}
});
*/
