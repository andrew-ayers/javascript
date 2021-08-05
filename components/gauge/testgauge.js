$(document).ready(function() {
	// data provider for gauge polling usage
	var getMyData = function(args) {
		return Math.floor(Math.random() * 200) - 100;
		//return Math.floor(Math.random() * 50) - 100;
		//return 90;
	}
	
	// set options for gauge display
	var options = {
		/*
		 * base options for gauge (must be defined for gauge to display!)
		 */
		id: 'myGauge',					// id of gauge control canvas element
		radius: 250, 					// width of the gauge face
		start: -100, 					// starting arc position for gauge face (in degrees)
		end: 100,						// ending arc position for gauge face (in degrees)
		facecolor: 'gray',				// color of face
		edgewidth: 3,					// width of face edge
		edgecolor: 'black',				// color of edge	
		
		/*
		 * value constraints and settings (should be defined; leave undefined at own risk!)
		 */ 
		mindegrees: -90,				// minimum degrees allowed for gauge
		maxdegrees: 90,					// maximum degrees allowed for gauge
		minvalue: -80,					// minimum value allowed for gauge
		maxvalue: 80,					// maximum value allowed for gauge
		value: 0,						// default starting value for gauge
		
		ring: {			
			radius: 205,
			start: 0,
			end: 90,
			width: 10,
			colors: {
				//type: 'solid',
				//type: 'segmented',
				type: 'dithered',
				//color: 'blue',
				ranges: {
					0: {
						boundry: -90,
						min: -90,
						max: -60,
						color: 'red',
						color1: 'red',
						color2: 'orange'
					},

					1: {
						boundry: -60,
						min: -60,
						max: -20,
						color: 'yellow',
						color1: 'orange',
						color2: 'yellow'
					},
					
					2: {
						boundry: 0,
						min: -20,
						max: 0,
						color: 'green',
						color1: 'yellow',
						color2: 'green'
					},

					3: {
						boundry: 0,
						min: 0,
						max: 20,
						color: 'green',
						color1: 'green',
						color2: 'yellow'
					},

					4: {
						boundry: 60,
						min: 20,
						max: 60,					
						color: 'yellow',			
						color1: 'yellow',
						color2: 'orange',
					},				

					5: {
						boundry: 90,
						min: 60,
						max: 90,					
						color: 'red',
						color1: 'orange',
						color2: 'red',
					}	
				}					
				
			},						
		},

		/*
		 * example of 'solid-arc'-type pointer (a pointer must be defined for it to display!)
		 */
		/*
		pointertype: 'arc',				// 'arc', 'pointer', 'line'
		pointerbasewidth: 10,			// used for type 'pointer' only
		pointerlinewidth: 10,			// width of line pointer is drawn with
		pointeroffset: 0,				// pointer offset angle in degrees
		pointerradius: 205,				// arc baseline radius
		pointercolor: {					// color settings for 'arc' pointer
			//type: 'solid',
			//type: 'segmented',
			type: 'dithered',
			color: 'red',
			//color: 'green',
			ranges: {
				0: {
					boundry: -90,
					min: -90,
					max: -60,
					color: 'red',
					color1: 'red',
					color2: 'orange'
				},

				1: {
					boundry: -60,
					min: -60,
					max: -20,
					color: 'yellow',
					color1: 'orange',
					color2: 'yellow'
				},
				
				2: {
					boundry: 0,
					min: -20,
					max: 0,
					color: 'green',
					color1: 'yellow',
					color2: 'green'
				},

				3: {
					boundry: 0,
					min: 0,
					max: 20,
					color: 'green',
					color1: 'green',
					color2: 'yellow'
				},

				4: {
					boundry: 60,
					min: 20,
					max: 60,					
					color: 'yellow',			
					color1: 'yellow',
					color2: 'orange',
				},				

				5: {
					boundry: 90,
					min: 60,
					max: 90,					
					color: 'red',
					color1: 'orange',
					color2: 'red',
				}	
			}			
		},
		pointerfilled: true,			// fill in the pointer (true or false)
		*/
		
		/*
		 * example of 'pointed'-type pointer
		 */
		pointertype: 'pointed',			// 'arc', 'pointed', 'line'
		pointerbasewidth: 10,			// used for type 'pointed' only
		pointerlinewidth: 1,			// width of line pointer is drawn with
		pointeroffset: 0,				// pointer offset angle in degrees
		pointerradius: 210,				// length of pointer
		pointercolor: 'red',			// color of pointer (for 'pointed' and 'line' pointers)
		pointerfilled: true,			// fill in the pointer (true or false)

		/*
		 * example of 'line'-type pointer
		 */
		/*
		pointertype: 'line',			// 'arc', 'pointed', 'line'
		pointerlinewidth: 3,			// width of line pointer is drawn with
		pointeroffset: 0,				// pointer offset angle in degrees
		pointerradius: 210,				// length of pointer
		pointercolor: 'red',			// color of pointer (for 'pointed' and 'line' pointers)
		*/
		
		/*
		 * pointer cap options (if not defined, cap will not be displayed)
		 */
		pointercapradius: 20,			// width of the pointer cap
		pointercaporder: 'behind',		// order to draw the cap in relation to the pointer ('front', 'behind')
		pointercapcolor: 'black',		// color of pointer cap
		pointercapfilled: true,			// fill in the cap (true or false)
		pointercapstart: 0,				// starting arc position for cap (in degrees)
		pointercapend: 360,				// ending arc position for cap (in degrees)
		
		/*
		 * tic marker options (if not defined, tic markers will not be displayed)
		 */
		ticradius: 240,					// starting width/radius of the tic markers
		ticmajorradius: 230,			// width/radius of the major tic markers
		ticminorradius: 235,			// width/radius of the minor tic markers
		ticstep: 10, 					// steps between major tic markers
		
		/*
		 * scale label options (if not defined, scale labels will not be displayed)
		 */
		scalefont: '10px Arial',		// font definition for the scale labels
		scalecolor: 'white',			// font color for the scale labels
		scalerotation: 90,				// rotation angle for scale labels (default = 0)
		scaleradius: 220,				// outer baseline position for scale labels
		scaleorder: 'front', 			// order to draw the scale labels in relation to the tic marks ('front', 'behind')

		/*
		 * custom scale labels can be defined for the gauge as follows
		 */
		scalecustom: {
			0: {value: -75, label: 'High'},
			1: {value: -45, label: 'Medium'},			
			2: {value: -15, label: 'Low'},
			3: {value: 0, label: 'Ok'},
			4: {value: 15, label: 'Low'},
			5: {value: 45, label: 'Medium'},			
			6: {value: 75, label: 'High'},			
		}
	}	
	
	var myGauge = new Gauge(options);
	
	myGauge.draw();	

	// initialize and start gauge polling
	myGauge.startPolling({
		provider: getMyData,
		params: {max: 100},
		interval: 2000
	});
	
	/*
	// stop gauge polling
	myGauge.stopPolling();
	*/
});
