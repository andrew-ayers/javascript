var Gauge = function(options) {
	if (options != undefined) {
		/* 
		 * utility functions
		 */
		 
		this._deg2radians = function(degrees) {
			return (degrees * (Math.PI / 180));
		}

		/*
		 * private stuff
		 */
		this._myColorConv = new ColorConv();

		this._options = options;
		 
		this._canvas = document.getElementById(this._options.id);
		this._context = this._canvas.getContext('2d');
		
		this._canvas.width = this._options.radius * 2 + 10;
		this._canvas.height = this._options.radius * 2 + 10;
		
		this._centerX = this._canvas.width / 2;
		this._centerY = this._canvas.height / 2;

		this._faceAngleMin = this._deg2radians(this._options.start - 90);
		this._faceAngleMax = this._deg2radians(this._options.end - 90);

		this._rangeMin = this._options.rangemin != undefined ? this._options.rangemin : -90;
		this._rangeMax = this._options.rangemax != undefined ? this._options.rangemax : 90;

		this._rangeAngleMin = this._deg2radians(this._options.start - 90);
		this._rangeAngleMax = this._deg2radians(this._options.end - 90);
		
		this._smoothing = 0.017; // gradient-arc smoothing hack

		/* 
		 * private module functions
		 */
		 
		this.startPolling = function(params) {
			if (params != undefined) {
				params.self = this;
				this._pollingID = window.setInterval(
					function(args, self) {
						var value = params.provider(args);
						
						self.draw(value);
					}.bind(undefined, params.params, params.self),
				params.interval);
			}
		}
		
		this.stopPolling = function() {
			window.clearInterval(this._pollingID);
		}

		this._drawFace = function() {
			if (this._options.edgewidth != undefined && this._options.edgecolor) {
				this._context.beginPath();
				this._context.arc(this._centerX, this._centerY, this._options.radius, this._deg2radians(this._options.start - 90), this._deg2radians(this._options.end - 90), false);
			
				// fill in face with color as defined
				if (this._options.facecolor != undefined) {
					this._context.fillStyle = this._options.facecolor;
					this._context.fill();
				}
			
				this._context.lineWidth = this._options.edgewidth;
				this._context.strokeStyle = this._options.edgecolor;
				
				this._context.stroke();
			}			
		}
		
		this._drawRing = function() {
			if (this._options.ring != undefined) {	
				this._drawArc(
					this._options.ring.radius, 
					0, 
					this._options.ring.end, 
					this._options.ring.width, 
					this._options.ring.colors
				);						
				
				this._drawArc(
					this._options.ring.radius, 
					this._options.ring.start, 
					0, 
					this._options.ring.width, 
					this._options.ring.colors
				);						
			}
		}
		
		this._drawTics = function() {
			if (this._options.ticradius != undefined &&
				this._options.ticminorradius != undefined && 
				this._options.ticmajorradius != undefined && 
				this._options.ticstep != undefined) {
					var minInterval = this._options.ticstep;
					
					for (var i = this._options.minvalue; i <= this._options.maxvalue; i++) {

						var degrees = ((i / (this._options.maxvalue - this._options.minvalue)) * 180) - 90;

						var startRadius = this._options.ticradius;
						var majRadius = this._options.ticmajorradius;
						var minRadius = this._options.ticminorradius;

						this._context.beginPath();

						this._context.moveTo(
							this._centerX + startRadius * Math.cos(this._deg2radians(degrees)), 
							this._centerY + startRadius * Math.sin(this._deg2radians(degrees))
						);
						
						if (minInterval < this._options.ticstep) {
							this._context.lineTo(
								this._centerX + minRadius * Math.cos(this._deg2radians(degrees)), 
								this._centerY + minRadius * Math.sin(this._deg2radians(degrees))
							);
						}
						else {
							this._context.lineTo(
								this._centerX + majRadius * Math.cos(this._deg2radians(degrees)), 
								this._centerY + majRadius * Math.sin(this._deg2radians(degrees))
							);
							
							minInterval = 0;
						}
					
						minInterval++;
					
						this._context.lineWidth = 1;
						this._context.strokeStyle = this._options.edgecolor;
						
						this._context.stroke();
					}
			}
		}
		
		this._drawScale = function() {
			if (this._options.ticstep != undefined && this._options.scalefont != undefined) {
				var minInterval = this._options.ticstep;
				
				for (var i = this._options.minvalue; i <= this._options.maxvalue; i++) {

					var degrees = ((i / (this._options.maxvalue - this._options.minvalue)) * 180) - 90;

					if (this._options.scalecustom == undefined) {
						if (minInterval >= this._options.ticstep) {
							// show major tic scale labels as needed	
							this._drawScaleLabels(i, degrees);
							
							minInterval = 0;
						}
						
						minInterval++;
					}
					else {
						// show custom labels as needed						
						var custom = this._options.scalecustom
						
						for (var pos in custom) {
							if (custom[pos].value == i) {
								this._drawScaleLabels(custom[pos].label, degrees);
								
								break;
							}
						}
					}					
				}
			}						
		}
		
		this._drawScaleLabels = function(label, degrees) {
			if (label != undefined && degrees != undefined) {
				this._context.save();

				this._context.font = this._options.scalefont;

				this._context.translate(
					this._centerX + this._options.scaleradius * Math.cos(this._deg2radians(degrees)),
					this._centerY + this._options.scaleradius * Math.sin(this._deg2radians(degrees))
				);
				
				if (this._options.scalerotation != undefined) {
					this._context.rotate(this._deg2radians(degrees + this._options.scalerotation));
				}

				this._context.fillStyle = this._options.scalecolor;
				
				this._context.textAlign = 'center';
				this._context.textBaseline = 'middle';
				
				this._context.fillText(label, 0, 0);

				this._context.restore();																	
			}
		}
		
		this._drawPointer = function(value) {
			value = (value == undefined) ? this._options.value : value;
			
			if (value != undefined && 
				this._options.pointerlinewidth != undefined && 
				this._options.pointercolor && 
				this._options.pointeroffset != undefined) {

				// bounds restricting (value)
				value = value >= this._options.minvalue ? value : this._options.minvalue;
				value = value <= this._options.maxvalue ? value : this._options.maxvalue;

				// convert passed in value to degrees
				var degrees = ((value / (this._options.maxvalue - this._options.minvalue)) * 180);

				// bounds restricting (degrees)
				degrees = degrees >= this._options.mindegrees ? degrees : this._options.mindegrees;
				degrees = degrees <= this._options.maxdegrees ? degrees : this._options.maxdegrees;
					
				var angle = this._deg2radians(degrees - 90 + this._options.pointeroffset);
		
				// draw pointer
				switch (this._options.pointertype) {
					case 'arc':
						if (degrees == 0) {
							this._context.beginPath();
							
							this._context.moveTo(
								this._centerX + this._options.pointerradius * Math.cos(this._deg2radians(-90)), 
								this._centerY + (this._options.pointerradius + (this._options.pointerlinewidth / 2)) * Math.sin(this._deg2radians(-90))
							);
					
							this._context.lineTo(
								this._centerX + this._options.pointerradius * Math.cos(this._deg2radians(-90)), 
								this._centerY + (this._options.pointerradius - (this._options.pointerlinewidth / 2)) * Math.sin(this._deg2radians(-90))
							);				

							this._context.lineWidth = 1;
							this._context.strokeStyle = this._options.pointercolor.color;						
							this._context.stroke();
							
							return;
						}					
					
						this._drawArc(this._options.pointerradius, 0, degrees, this._options.pointerlinewidth, this._options.pointercolor);						
						break;
						
					case 'pointed':
						this._drawPointed(degrees, angle);
						break;
						
					case 'line':
						// break intentionally omitted
						
					default:
						// Line style
						this._drawLine(angle);
				}
			}
		}
		
		this._drawPointed = function(degrees, angle) {
			if (degrees != undefined && angle != undefined) {
				this._context.beginPath();
								
				this._context.moveTo(this._centerX, this._centerY);
				
				var left = this._deg2radians(degrees - 180 + this._options.pointeroffset);
				var right = this._deg2radians(degrees + this._options.pointeroffset);
			
				this._context.lineTo(
					this._centerX + ((this._options.pointerbasewidth / 2) * Math.cos(left)), 
					this._centerY + ((this._options.pointerbasewidth / 2) * Math.sin(left))
				);
				
				this._context.lineTo(
					this._centerX + this._options.pointerradius * Math.cos(angle), 
					this._centerY + this._options.pointerradius * Math.sin(angle)
				);

				this._context.lineTo(
					this._centerX + ((this._options.pointerbasewidth / 2) * Math.cos(right)), 
					this._centerY + ((this._options.pointerbasewidth / 2) * Math.sin(right))
				);

				this._context.closePath();
				
				if (this._options.pointerfilled == true) {
					this._context.fillStyle = this._options.pointercolor;
					this._context.fill();
				}				

				this._context.lineWidth = this._options.pointerlinewidth;
				this._context.strokeStyle = this._options.pointercolor;
				
				this._context.stroke();															
			}
		}

	    this._drawLine = function(angle) {
			if (angle != undefined) {
				this._context.beginPath();
								
				this._context.moveTo(this._centerX, this._centerY);
				
				this._context.lineTo(
					this._centerX + this._options.pointerradius * Math.cos(angle), 
					this._centerY + this._options.pointerradius * Math.sin(angle)
				);		
											
				this._context.lineWidth = this._options.pointerlinewidth;
				this._context.strokeStyle = this._options.pointercolor;
				
				this._context.stroke();											
			}
		}
		
		this._drawArc = function(radius, start, end, width, colors) {
			if (radius != undefined && start != undefined && end != undefined && colors != undefined) {
				var angle = this._deg2radians(start - 90 + this._options.pointeroffset);
				
				if (start < end) {
					// swap start/end values for arc
					start = [end, end = start][0];
				}

				switch (colors.type) {
					case 'dithered':					  
						// break intentionally omitted
					  
					case 'segmented':					
						var segments = [];

						for (range in colors.ranges) {
							var color = colors.ranges[range];
							// center (zero) value
							if (start == 0 && end == 0) {							
								if (color.boundry == 0) {
									segments[segments.length] = {
										start: 0,
										end: 0,
										color: color.color,
										color1: color.color1,
										color2: color.color2
									}
								}
							}
							
							// negative values
							if (start == 0 && end < 0) {							
								if (color.boundry <= 0) {
									if (end < color.max) {
										segments[segments.length] = {
											start: color.max,
											end: color.min,
											color: color.color,
											color1: color.color1,
											color2: color.color2,
										}
									}
								}
							}
							
							// positive values
							if (start > 0 && end == 0) {
								if (color.boundry >= 0) {
									if (start > color.min) {
										segments[segments.length] = {
											start: color.max,
											end: color.min,
											color: color.color,
											color1: color.color1,
											color2: color.color2,
										}
									}
								}
							}
						}

						// negative values
						if (start == 0 && end < 0) {
							segments[0].end = end;
							segments[segments.length - 1].start = 0;
						}

						// positive values
						if (start > 0 && end == 0) {
							segments[0].end = 0;
							segments[segments.length - 1].start = start;
						}

						// draw multi-color arc
						this._context.lineWidth = width;
						
						for (var i in segments) {
							i = parseInt(i);
							
							var segment = segments[i];
							
							if (colors.type == 'segmented') {
								// draw solid-color segmented arc
								this._context.beginPath();
								this._context.arc(this._centerX, this._centerY, radius, this._deg2radians(segment.start - 90), this._deg2radians(segment.end - 90), true);
								this._context.strokeStyle = segment.color;
								this._context.stroke();															
							}
							
							if (colors.type == 'dithered') {
								// draw dithered/gradient arc
								for (var s = segment.end, e = segment.start; s <= e - 1; s += 1) {									
									this._context.beginPath();

									this._context.arc(this._centerX, this._centerY, radius, this._deg2radians(s - 89) + this._smoothing, this._deg2radians(s - 90), true);
									
									var colorpos = (s - segment.end) / Math.abs(segment.start - segment.end); // percentage position within arc-segment
									
									var newcolor = this._myColorConv.getRGBfromGradient(colorpos, this._myColorConv.name2rgb(segment.color1), this._myColorConv.name2rgb(segment.color2));
									
									this._context.strokeStyle = newcolor;
									
									this._context.stroke();															
								}
							}
							
						}
					
						break;
					  
					case 'solid':
						// break intentionally omitted
					  
					default:
						// draw solid-color non-segmented arc
						this._context.beginPath();
						
						this._context.moveTo(
							this._centerX + radius * Math.cos(this._deg2radians(start - 90)), 
							this._centerY + radius * Math.sin(this._deg2radians(start - 90))
						);

						this._context.strokeStyle = colors.color				
						this._context.stroke();
						this._context.lineWidth = width;
					
						this._context.beginPath();
						this._context.arc(this._centerX, this._centerY, radius, this._deg2radians(start - 90), this._deg2radians(end - 90), true);
						this._context.strokeStyle = colors.color;						
						this._context.stroke();
				}
			}
		}
		
		this._drawCap = function() {
			// draw pointer cap at base of pointer
			if (this._options.pointercapradius != undefined && 
				this._options.pointercapcolor != undefined &&
				this._options.pointercapstart != undefined &&
				this._options.pointercapend != undefined) {
					
				this._context.beginPath();
				
				this._context.arc(this._centerX, this._centerY, this._options.pointercapradius, this._deg2radians(this._options.pointercapstart - 90), this._deg2radians(this._options.pointercapend - 90), false);

				if (this._options.pointercapfilled == true) {				
					this._context.fillStyle = this._options.pointercapcolor;
					this._context.fill();
				}

				this._context.lineWidth = this._options.pointerlinewidth;
				this._context.strokeStyle = this._options.pointercapcolor;	
				this._context.stroke();				
			}			
		}
		
		this._drawBottomBorder = function() {
			if (this._options.edgewidth != undefined && this._options.edgecolor) {
				this._context.beginPath();

				// draw border at bottom of gauge face along chord
				this._context.moveTo(
					this._centerX + this._options.radius * Math.cos(this._deg2radians(this._options.start - 90)), 
					this._centerY + this._options.radius * Math.sin(this._deg2radians(this._options.start - 90))
				);
		
				this._context.lineTo(
					this._centerX + this._options.radius * Math.cos(this._deg2radians(this._options.end - 90)), 
					this._centerY + this._options.radius * Math.sin(this._deg2radians(this._options.end - 90))
				);
			
				this._context.lineWidth = this._options.edgewidth;
				this._context.strokeStyle = this._options.edgecolor;
				
				this._context.stroke();
			}
		}
		
		// clears the canvas, without resetting the anti-aliasing
		this._clear = function() {
			// store the current transformation matrix
			this._context.save();

			// use the identity matrix while clearing the canvas
			this._context.setTransform(1, 0, 0, 1, 0, 0);
			this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

			// restore the transform
			this._context.restore();
		}
		
		this.draw = function(value) {		
			// clear the canvas
			this._clear();
			
			// draw the face of the gauge
			this._drawFace();
			
			// draw ring on the gauge
			this._drawRing();
			
			// draw the scale (behind tic marks)
			if (this._options.scaleorder == 'behind') this._drawScale();
			
			// draw the tic marker lines
			this._drawTics();

			// draw the scale (in front of tic marks)
			if (this._options.scaleorder == 'front') this._drawScale();

			// draw the pointer cap (behind pointer)
			if (this._options.pointercaporder == 'behind') this._drawCap();
			
			// draw the pointer
			this._drawPointer(value);
			
			// draw the pointer cap (in front of pointer)
			if (this._options.pointercaporder == 'front') this._drawCap();
			
			// draw the "bottom" border line
			this._drawBottomBorder();
		}		
	}
}
