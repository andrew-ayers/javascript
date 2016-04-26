$(document).ready(function() {
	var myRaf1 = new RafTest('raf1', 500);
	var myRaf2 = new RafTest('raf2', 2000);
	var myRaf3 = new RafTest('raf3', 250);
	
	myRaf1.startPolling();	
	myRaf2.startPolling();	
	myRaf3.startPolling();	
});
