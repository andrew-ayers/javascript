var RafTest = function(id, pollinterval) {

	this.divid = id;
	this.pollinterval = pollinterval;
	this.counter = 0;

	this.startPolling = function() {
		this.pollingID = requestAnimationFrame(this.draw.bind(this));
	}
	
	this.stopPolling = function() {
		cancelAnimationFrame(this.pollingID);
	}

	this.draw = function(timestamp) {
		if (timestamp - this.lastPolled >= this.pollinterval || this.lastPolled == null) {
			this.lastPolled = timestamp;					

			console.log('DIV:' + this.divid + ':' + this.counter);
			
			this.counter++;
		}
		
		requestAnimationFrame(this.draw.bind(this));
	}		
}
