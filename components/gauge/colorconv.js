var ColorConv = function() {
	this.name2rgb = function(name) {
		// see: http://www.w3schools.com/html/html_colorvalues.asp
		if (name != undefined) {
				switch (name.toLowerCase()) {
					case "black": return "#000000";
					case "navy": return "#000080";
					case "darkblue": return	"#00008b";
					case "mediumblue": return "#0000cd";
					case "blue": return "#0000ff";
					case "darkgreen": return "#006400";
					case "green": return "#008000";
					case "teal": return "#008080";
					case "darkcyan": return	"#008b8b";
					case "deepskyblue": return "#00bfff";
					case "darkturquoise": return "#00ced1";
					case "mediumspringgreen": return "#00fa9a";
					case "lime": return "#00ff00";
					case "springgreen": return "#00ff7f";
					case "aqua": return "#00ffff";
					case "cyan": return "#00ffff";
					case "midnightblue": return "#191970";
					case "dodgerblue": return "#1e90ff";
					case "lightseagreen": return "#20b2aa";
					case "forestgreen": return "#228b22";
					case "seagreen": return "#2e8b57";
					case "darkslategray": return "#2f4f4f";
					case "limegreen": return "#32cd32";
					case "mediumseagreen": return "#3cb371";
					case "turquoise": return "#40e0d0";
					case "royalblue": return "#4169e1";
					case "steelblue": return "#4682b4";
					case "darkslateblue": return "#483d8b";
					case "mediumturquoise": return "#48d1cc";
					case "indigo": return "#4b0082";
					case "darkolivegreen": return "#556b2f";
					case "cadetblue": return "#5f9ea0";
					case "cornflowerblue": return "#6495ed";
					case "mediumaquamarine": return	"#66cdaa";
					case "dimgray": return "#696969";
					case "slateblue": return "#6a5acd";
					case "olivedrab": return "#6b8e23";
					case "slategray": return "#708090";
					case "lightslategray": return "#778899";
					case "mediumslateblue": return "#7b68ee";
					case "lawngreen": return "#7cfc00";
					case "chartreuse": return "#7fff00";
					case "aquamarine": return "#7fffd4";
					case "maroon": return "#800000";
					case "purple": return "#800080";
					case "olive": return "#808000";
					case "gray": return "#808080";
					case "skyblue": return "#87ceeb";
					case "lightskyblue": return "#87cefa";
					case "blueviolet": return "#8a2be2";
					case "darkred": return "#8b0000";
					case "darkmagenta": return "#8b008b";
					case "saddlebrown": return "#8b4513";
					case "darkseagreen": return "#8fbc8f";
					case "lightgreen": return "#90ee90";
					case "mediumpurple": return "#9370db";
					case "darkviolet": return "#9400d3";
					case "palegreen": return "#98fb98";
					case "darkorchid": return "#9932cc";
					case "yellowgreen": return "#9acd32";
					case "sienna": return "#a0522d";
					case "brown": return "#a52a2a";
					case "darkgray": return "#a9a9a9";
					case "lightblue": return "#add8e6";
					case "greenyellow": return "#adff2f";
					case "paleturquoise": return "#afeeee";
					case "lightsteelblue": return "#b0c4de";
					case "powderblue": return "#b0e0e6";
					case "firebrick": return "#b22222";
					case "darkgoldenrod": return "#b8860b";
					case "mediumorchid": return "#ba55d3";
					case "rosybrown": return "#bc8f8f";
					case "darkkhaki": return "#bdb76b";
					case "silver": return "#c0c0c0";
					case "mediumvioletred": return "#c71585";
					case "indianred": return "#cd5c5c";
					case "peru": return "#cd853f";
					case "chocolate": return "#d2691e";
					case "tan": return "#d2b48c";
					case "lightgray": return "#d3d3d3";
					case "thistle": return "#d8bfd8";
					case "orchid": return "#da70d6";
					case "goldenrod": return "#daa520";
					case "palevioletred": return "#db7093";
					case "crimson": return "#dc143c";
					case "gainsboro": return "#dcdcdc";
					case "plum": return "#dda0dd";
					case "burlywood": return "#deb887";
					case "lightcyan": return "#e0ffff";
					case "lavender": return "#e6e6fa";
					case "darksalmon": return "#e9967a";
					case "violet": return "#ee82ee";
					case "palegoldenrod": return "#eee8aa";
					case "lightcoral": return "#f08080";
					case "khaki": return "#f0e68c";
					case "aliceblue": return "#f0f8ff";
					case "honeydew": return "#f0fff0";
					case "azure": return "#f0ffff";
					case "sandybrown": return "#f4a460";
					case "wheat": return "#f5deb3";
					case "beige": return "#f5f5dc";
					case "whitesmoke": return "#f5f5f5";
					case "mintcream": return "#f5fffa";
					case "ghostwhite": return "#f8f8ff";
					case "salmon": return "#fa8072";
					case "antiquewhite": return "#faebd7";
					case "linen": return "#faf0e6";
					case "lightgoldenrodyellow": return "#fafad2";
					case "oldlace": return "#fdf5e6";
					case "red": return "#ff0000";
					case "fuchsia": return "#ff00ff";
					case "magenta": return "#ff00ff";
					case "deeppink": return "#ff1493";
					case "orangered": return "#ff4500";
					case "tomato": return "#ff6347";
					case "hotpink": return "#ff69b4";
					case "coral": return "#ff7f50";
					case "darkorange": return "#ff8c00";
					case "lightsalmon": return "#ffa07a";
					case "orange": return "#ffa500";
					case "lightpink": return "#ffb6c1";
					case "pink": return "#ffc0cb";
					case "gold": return "#ffd700";
					case "peachpuff": return "#ffdab9";
					case "navajowhite": return "#ffdead";
					case "moccasin": return "#ffe4b5";
					case "bisque": return "#ffe4c4";
					case "mistyrose": return "#ffe4e1";
					case "blanchedalmond": return "#ffebcd";
					case "papayawhip": return "#ffefd5";
					case "lavenderblush": return "#fff0f5";
					case "seashell": return "#fff5ee";
					case "cornsilk": return "#fff8dc";
					case "lemonchiffon": return "#fffacd";
					case "floralwhite": return "#fffaf0";
					case "snow": return "#fffafa";
					case "yellow": return "#ffff00";
					case "lightyellow": return "#ffffe0";
					case "ivory": return "#fffff0";
					case "white": return "#ffffff";
					default: return	name.toLowerCase();									
				}
		}
	}
	
	this.hex2dec = function(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;		
	}
	
	this.getRGBfromGradient = function(pos, fromcolor, tocolor) {

		var fromRGB = this.hex2dec(this.name2rgb(fromcolor));
		
		var fromR = fromRGB.r;
		var fromG = fromRGB.g;
		var fromB = fromRGB.b;
		
		var toRGB = this.hex2dec(this.name2rgb(tocolor));
		
		var toR = toRGB.r;
		var toG = toRGB.g;
		var toB = toRGB.b;
		
		var deltaR = toR - fromR;
		var deltaG = toG - fromG;
		var deltaB = toB - fromB;
		
		var posR = Math.floor(deltaR * pos);
		var posG = Math.floor(deltaG * pos);
		var posB = Math.floor(deltaB * pos);		
		
		var newR = fromR + posR;
		var newG = fromG + posG;
		var newB = fromB + posB;
		
		return "#" + ((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1);
	}
}
