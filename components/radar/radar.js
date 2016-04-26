var Radar = function(options) {
	if (options != undefined) {
		/* 
		 * utility functions
		 */
		 
		this._deg2radians = function(degrees) {
			return (degrees * (Math.PI / 180));
		}

		/*
		 * classes
		 */

		// shapes class
		this.Shapes = function(parent) {
			this._parent = parent;
			
			this.triangle = function(posx, posy, width, line, color, fill) {
				this._parent._context.beginPath();
				
				this._parent._context.moveTo(posx, posy - (width / 2));

				this._parent._context.lineTo(
					posx + (width / 2), 
					posy + (width / 2)
				);

				this._parent._context.lineTo(
					posx - (width / 2), 
					posy + (width / 2)
				);

				this._parent._context.closePath();		
				
				if (fill != undefined) {				
					this._parent._context.fillStyle = fill;
					this._parent._context.fill();
				}

				if (color != undefined && line != undefined) {					
					this._parent._context.lineWidth = line;
					this._parent._context.strokeStyle =color;	
					this._parent._context.stroke();				
				}
			}
			
			this.cross = function(posx, posy, width, line, color, fill) {
				this._parent._context.beginPath();
				
				this._parent._context.moveTo(posx - (width / 2), posy - (width / 2));

				this._parent._context.lineTo(
					posx + (width / 2), 
					posy + (width / 2)
				);

				this._parent._context.moveTo(posx - (width / 2), posy + (width / 2));

				this._parent._context.lineTo(
					posx + (width / 2), 
					posy - (width / 2)
				);

				if (color != undefined && line != undefined) {					
					this._parent._context.lineWidth = line;
					this._parent._context.strokeStyle = color;	
					this._parent._context.stroke();				
				}
			}
			
			this.plus = function(posx, posy, width, line, color) {
				this._parent._context.beginPath();

				this._parent._context.moveTo(posx, posy - (width / 2));

				this._parent._context.lineTo(
					posx, 
					posy + (width / 2)
				);

				this._parent._context.moveTo(posx - (width / 2), posy);

				this._parent._context.lineTo(
					posx + (width / 2), 
					posy
				);

				if (color != undefined && line != undefined) {					
					this._parent._context.lineWidth = line;
					this._parent._context.strokeStyle = color;	
					this._parent._context.stroke();				
				}
			}
			
			this.circle = function(posx, posy, width, start, end, line, color, fill) {
				this._parent._context.beginPath();
				
				this._parent._context.arc(posx, posy, width / 2, this._parent._deg2radians(start - 90), this._parent._deg2radians(end - 90), false);
				
				if (fill != undefined) {				
					this._parent._context.fillStyle = fill;
					this._parent._context.fill();
				}

				if (color != undefined && line != undefined) {					
					this._parent._context.lineWidth = line;
					this._parent._context.strokeStyle = color;	
					this._parent._context.stroke();				
				}
			}						
		}
		
		// target class (for located targets)
		this.Target = function(parent, target) {
			this._parent = parent;
			this._bearing = target.bearing;
			this._distance = target.distance;
			this._counter = 100;
			this._last = 0;
			this._blinks = 8;
			this._radii = 0;
			this._radmax = 40;
			this._draw = true;
			this.alive = true;

			this.draw = function() {
				if (this._counter > 0) {
					var posx = this._parent._centerX + this._distance * Math.cos(this._parent._deg2radians(this._bearing - 90)); 
					var posy = this._parent._centerY + this._distance * Math.sin(this._parent._deg2radians(this._bearing - 90));

					var curr = Date.now();

					switch (this._parent._options.targets.ping) {					
						case 'blink':
							if (curr - this._last > 50) {
								this._draw = !this._draw;
								this._last = curr;
								
								if (this._blinks > 0) {
									this._blinks--;
								}
								else {
									this._draw = true;
								}
							}
							
							break;
							
						case 'pulse':
							if (curr - this._last > 25) {								
								this._last = curr;
								
								if (this._radii < this._radmax) {
									this._parent._shapes.circle(posx, posy, this._radii, 0, 360, 1, this._parent._options.targets.color, null);
									this._radii += 2;
								}
								else {
									this._radii = this._radmax;
								}
							}

							this._draw = true;
							
							break;
							
						case 'locate':
							if (curr - this._last > 25) {								
								this._last = curr;
								
								if (this._radmax > 0) {
									this._parent._shapes.circle(posx, posy, this._radmax, 0, 360, 1, this._parent._options.targets.color, null);
									this._radmax -= 2;
								}
								else {
									this._radmax = 0;
								}
							}

							this._draw = true;

							break;
							
						case 'none':
							// break intentionally omitted
							
						default:
							this._draw = true;
					}
						
					if (this._draw) {
						switch (this._parent._options.targets.type) {
							case 'x':
								this._parent._shapes.cross(posx, posy, this._parent._options.targets.width, this._parent._options.targets.line, this._parent._options.targets.color);
								
								break;

							case 'plus':
								this._parent._shapes.plus(posx, posy, this._options._parent.targets.width, this._parent._options.targets.line, this._parent._options.targets.color);
								
								break;
								
							case 'circle':
								this._parent._shapes.circle(posx, posy, this._parent._options.targets.width, 0, 360, this._parent._options.targets.line, this._parent._options.targets.color, this._parent._options.targets.fill);

								break;

							case 'triangle':
								this._parent._shapes.triangle(posx, posy, this._parent._options.targets.width, this._parent._options.targets.line, this._parent._options.targets.color, this._parent._options.targets.fill);
							
								break;

							case 'point':
								// break intentionally omitted
							default:
								this._parent._shapes.circle(posx, posy, 2, 0, 360, 1, this._parent._options.targets.color, this._parent._options.targets.fill);
						}					
					}
					
					this._counter--;
				}
				else {
					this.alive = false;
				}				
			}
		}

		/*
		 * private stuff
		 */
		 
		this._options = options;
		 
		this._canvas = document.getElementById(this._options.id);
		this._context = this._canvas.getContext('2d');
		
		this._canvas.width = this._options.radius * 2 + 10;
		this._canvas.height = this._options.radius * 2 + 10;
		
		this._centerX = this._canvas.width / 2;
		this._centerY = this._canvas.height / 2;
		
		this._shapes = new this.Shapes(this);
		
		// default data polling values
		this._dataPoll = {
			counter: 0,
			data: null
		}
		
		// default sweep state values
		this._sweepstate = {
			bearing: 0,
			min: 0,
			max: 360,
			delta: 1 * (this._options.sweep.direction == 'ccw' ? -1 : 1)
		}
		
		// target queue
		this._targets = [];
		
		/* 
		 * public module functions
		 */
		 
		this.startPolling = function(params) {
			if (params != undefined) {
				// kick off the calling of the drawing routine, via the
				// requestAnimationFrame() API method (binding this context) 
				this._params = params;

				this._pollingID = requestAnimationFrame(this._draw.bind(this));
			}
		}
		
		this.stopPolling = function() {
			cancelAnimationFrame(this._pollingID);
		}

		/* 
		 * private module functions
		 */

		this._drawFace = function() {
			if (this._options.reticle.color != undefined) {
				this._xpos = this._centerX;
				this._ypos = this._centerY;
				this._start = 0;
				this._end = 360;

				switch (this._options.position) {
					case 'left':
						this._xpos = 0;
						this._end = 180;
						break;
						
					case 'right':
						this._xpos = this._canvas.width;
						this._start = 180;
						break;
						
					case 'top':
						this._ypos = 0;
						this._start = 90;
						this._end = 270;
						break;
						
					case 'bottom':
						this._ypos = this._canvas.height;
						this._start = 270;
						this._end = 90;
						break;
						
					case 'center':
						// break intentionally omitted
					default:						
				}
				
				this._context.beginPath();

				this._context.lineWidth = this._options.face.edgewidth;
				this._context.strokeStyle = this._options.reticle.color;
				
				this._context.arc(this._xpos, this._ypos, this._options.radius, this._deg2radians(this._start - 90), this._deg2radians(this._end - 90), false);
			
				// fill in face with color as defined
				if (this._options.face.color != undefined) {
					this._context.fillStyle = this._options.face.color;
					this._context.fill();
				}
			
				this._context.stroke();
			}			
		}
		
		
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		
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

		
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		this._drawCap = function() {
			// draw cap at base of sweep
			switch (this._options.cap.type) {
				case 'triangle':
					if (this._options.position == 'center') {
						this._shapes.triangle(this._centerX, this._centerY, this._options.cap.width, this._options.cap.line, this._options.cap.color, this._options.cap.fill);
					}
					
					break;
					
				case 'x':
					if (this._options.position == 'center') {
						this._shapes.cross(this._centerX, this._centerY, this._options.cap.width, this._options.cap.line, this._options.cap.color);
					}
				
					break;
					
				case 'plus':
					if (this._options.position == 'center') {
						this._shapes.plus(this._centerX, this._centerY, this._options.cap.width, this._options.cap.line, this._options.cap.color);
					}
				
					break;
					
				case 'circle':		
					if (this._options.cap.width != undefined) {
						this._shapes.circle(this._centerX, this._centerY, this._options.cap.width, this._start, this._end, this._options.cap.line, this._options.cap.color, this._options.cap.fill);							
					}
					
					break;
					
				case 'none':
					// break intentionally omitted						
				default:
			}
		}

		///////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		
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

		this._drawReticle = function() {	
			for (var radius = 0; radius < this._options.radius; radius += 50) {
				this._context.beginPath();
				
				this._context.arc(this._centerX, this._centerY, radius, this._deg2radians(this._start - 90), this._deg2radians(this._end - 90), false);
				
				this._context.lineWidth = this._options.reticle.line;
				this._context.strokeStyle = this._options.reticle.color;
				
				this._context.stroke();				
			}
		}
		
		this._drawTargets = function() {
			for (var i in this._targets) {
				var target = this._targets[i];
				
				if (target.alive) {						
					target.draw();
				}
				else {
					this._targets.splice(i, 1);
				}
			}			
		}
		
		this._targetsInRange = function() {
			var found = false;
			
			var targets = this._dataPoll.data;

			for (var i in targets) {
				var target = targets[i];

				if (!target.pinged) {
					if (target.distance <= this._options.radius) {
						if (this._sweepstate.delta > 0) {
							// CW rotation
							if ((target.bearing >= (this._sweepstate.bearing - this._options.sweep.rate) && 
								target.bearing <= this._sweepstate.bearing)) {
									this._targets.push(new this.Target(this, target));
									this._dataPoll.data[i].pinged = true;
									found = true;
							}
						}
						
						if (this._sweepstate.delta < 0) {
							// CCW rotation
							if (target.bearing >= this._sweepstate.bearing &&
								target.bearing <= (this._sweepstate.bearing + this._options.sweep.rate)) {
									this._targets.push(new this.Target(this, target));
									this._dataPoll.data[i].pinged = true;
									found = true;
							}
						}
					}
				}
			}
						
			return found;			
		}
		
		this._drawSweep = function() {

			this._context.beginPath();

			switch (this._options.sweep.type) {
				case 'line':
					// break intentionally omitted				
				default:
					this._context.moveTo(this._xpos, this._ypos);
					
					this._context.lineTo(
						this._xpos + this._options.radius * Math.cos(this._deg2radians(this._sweepstate.bearing - 90)), 
						this._ypos + this._options.radius * Math.sin(this._deg2radians(this._sweepstate.bearing - 90))
					);		
												
					this._context.lineWidth = this._options.sweep.width;
					this._context.strokeStyle = this._options.sweep.color;
					
					this._context.stroke();											
					
					//
					
					this._sweepstate.bearing += (this._sweepstate.delta * this._options.sweep.rate);
					
					if (this._sweepstate.delta > 0) {
						// CW rotation
						if (this._sweepstate.bearing >= this._sweepstate.max) {
							this._sweepstate.bearing = this._sweepstate.min;
						}
					}

					if (this._sweepstate.delta < 0) {
						// CCW rotation
						if (this._sweepstate.bearing <= this._sweepstate.min) {
							this._sweepstate.bearing = this._sweepstate.max;
						}
					}
					
			}
		}
		
		this._draw = function(timestamp) { //params) {		
			// if this is the first time called, or the polling interval is 
			// exceeded, then get the data needed for updating the display
			if (timestamp - this._dataPoll.lastPolled >= this._params.pollinterval || this._dataPoll.data == null) {
				this._dataPoll.lastPolled = timestamp;					

				this._dataPoll.data = this._params.provider(this._params.params);
			}
				
			this._targetsInRange();
			
			// clear the canvas
			this._clear();

			// draw the face
			this._drawFace();
			
			//console.log(this._dataPoll.lastPolled, this._dataPoll.counter, this._params.pollinterval, this._dataPoll.data[1].bearing);
			
			// draw the reticle
			this._drawReticle();

			this._drawTargets();

			// draw the sweep
			this._drawSweep();

			// draw the cap
			this._drawCap();
			
			// keep re-calling this function (binding this context)
			requestAnimationFrame(this._draw.bind(this));
		}		
	}
}
