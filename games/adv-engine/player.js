var Player = function() {
	this.getLocation = function() {
		return playerData.location;
	}
	
	this.getCarrying = function() {
		return playerData.carrying;		
	}
	
	this.stashObject = function(item) {
		playerData.carrying.push(item);
	}
	
	this.dropObject = function(item) {
		return playerData.carrying[item];
	}
}
