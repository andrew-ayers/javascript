// Algorithm from http://www.evilscience.co.uk/map-generator/

var mapx = 100;
var mapy = 100;
var map = new Array(mapy);

//var p = 45, h = true, n = 4, i = 50000;  // island map
//var p = 45, h = false, n = 4, i = 50000;  // labyrinth map
var p = 65, h = true, n = 4, i = 80000;  // dense cave map
//var p = 45, h = true, n = 4, i = 85000;  // sparse island map
//var p = 45, h = true, n = 4, i = 85000;  // sparse island map
//var p = 65, h = false, n = 5, i = 50000;
//var p = 48, h = true, n = 4, i = 50000;

function clear() {
	for (var y=0; y < mapy; y++) {
		var row = new Array(mapx);
		
		for (var x=0; x < mapx; x++) {
			row[x] = '.';
		}
		
		map[y] = row;
	}
}

function open() {
	for (var y=0; y < mapy; y++) {
		for (var x=0; x < mapx; x++) {
			if (Math.floor(Math.random() * 100) < p) {
				map[y][x] = '#';
			}
		}
	}
}

function closed(xpos, ypos) {
	var count = 0;
	
	for (var y = -1; y < 2; y++) {
		for (var x = -1; x < 2; x++) {
			if (!(x == 0 && y == 0)) {
				if (check(xpos + x, ypos + y) == true) {
					count++;
				}
			}
		}
	}
	
	return count;
}

function check(xpos, ypos) {
	if (xpos >= 0 && xpos < mapx && ypos >=0 && ypos < mapy) {
		return (map[ypos][xpos] == '#');
	}
	else {
		return false;
	}
}

function display() {
	for (var y=0; y < mapy; y++) {
		var row = '';
		for (var x=0; x < mapx; x++) {
			row += map[y][x];
		}
		
		var yy = y < 10 ? '0' + y : y;
		
		console.log(yy + ': ' + row + "\n");
	}
}

function generate(iterations) {
	clear();
	open();
	
	while(iterations > 0) {
		var randx = Math.floor(Math.random() * mapx);
		var randy = Math.floor(Math.random() * mapy);
		
		var isclosed = closed(randx, randy);
		
		if (h == true) {
			if (isclosed > n) {
				// close cell
				map[randy][randx] = '#';
			}
			else {
				// open cell
				map[randy][randx] = '.';
			}
		}
		else {
			if (isclosed > n) {
				// open cell
				map[randy][randx] = '.';
			}
			else {
				// close cell
				map[randy][randx] = '#';
			}
		}
		
		iterations--;
	}
}

generate(i);
display();