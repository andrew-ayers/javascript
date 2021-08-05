$(document).ready(function() {
	// Instantiate the object, passing option values
	var myPlayer = new RealPlayer({sally:4321});

	// Call a method defined on the base class
	myPlayer.testFunc();
	
	// Call a method defined on the player class (get default position)
	console.log(myPlayer.getPosition());
	
	// Call a method to set the position data (on the player class)
	myPlayer.setPosition({x: 10, y: 5});
	
	// Call a method defined on the player class (show the new position)
	console.log(myPlayer.getPosition());
	
	// Call a method defined on the player class (move the position)
	myPlayer.movePosition(20, 20);
	
	// Call a method defined on the player class (show the new position)
	console.log(myPlayer.getPosition());
	
	// Call a method defined by the inheritance
	// system to get the inherited options
	console.log(myPlayer.getOptions());
	
	// Call a method defined by the inheritance
	// system to get the "super" (Base) class
	console.log(myPlayer.getSuper());
});
