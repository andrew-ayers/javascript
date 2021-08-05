$(document).ready(function() {
	// data provider for radar polling usage
	var getMyData = function(args) {
		var values = [];
		
		for (var i = 0, cnt = (args != undefined) ? args : 5; i < cnt; i++) {
			var bear = Math.floor(Math.random() * 360);
			var dist = Math.floor(Math.random() * 300);
			
			values[i] = {
				bearing: bear,
				distance: dist
			}
		}
		
		//console.log(values);
		return values;
	}
	
	// set options for gauge display
	var options = {
		/*
		 * base options for gauge (must be defined for gauge to display!)
		 */
		id: 'myRadar',					// id of gauge control canvas element
		radius: 250, 					// width of the gauge face
		position: 'center',				// center, left, right, top, bottom
		
		face: {
			color: 'black',
			edgewidth: 5
		},
		
		reticle: {
			type: 'polar',
			color: 'green',
			line: 2,
			step: 50,
			autoscale: true
		},
		
		cap: {
			type: 'triangle',			// none, circle, triangle, plus, x
			color: 'green',
			width: 20,
			line: 2,
			fill: 'lightgrey'
		},
		
		sweep: {
			type: 'line',				// line, radial
			direction: 'ccw',			// cw, ccw, sweep, pulseout, pulsein, ping
			color: 'green',
			width: 1,
			rate: 16
		},
		
		targets: {
			type: 'triangle',			// point, plus, circle, x, triangle
			ping: 'blink',				// none, blink, pulse, locate
			color: 'red',
			//fill: 'grey',
			width: 10,
			line: 1
		}
	}	
	
	var myRadar = new Radar(options);
	
	//myRadar.draw();	

	// initialize and start polling
	myRadar.startPolling({
		provider: getMyData,
		params: 5,
		pollinterval: 2000
	});
	
	// stop polling
	/*
	myRadar.stopPolling();
	*/
});
