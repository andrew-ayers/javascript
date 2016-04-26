var Room = function() {
	this.getShortDescription = function(name) {
		for (var i in roomData) {
			if (roomData[i].name == name) {
				return roomData[i].short;
			}
		}
	}
	
	this.getLongDescription = function(name) {
		for (var i in roomData) {
			if (roomData[i].name == name) {
				return roomData[i].long;
			}
		}
	}
	
	this.getDirections = function(name) {
		for (var i in roomData) {
			if (roomData[i].name == name) {
				return roomData[i].long;
			}
		}
	}
}
