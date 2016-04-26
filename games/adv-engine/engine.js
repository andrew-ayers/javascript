var Engine = function() {
	this._showTitle = function() {
		$('title').html(titleData.name);
		$('#title').html(titleData.name);
	}
	
	this._player = new Player();
	this._room = new Room();
	
	this.run = function() {
		this._showTitle();
		
		var location = this._player.getLocation();
		var description = this._room.getLongDescription(location);
		
		$('#description').html(description);
	}
}
