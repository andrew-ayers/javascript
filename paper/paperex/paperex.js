var myPath;

var hitOptions = {
	segments: true,
	stroke: true,
	fill: true,
	tolerance: 5
};

var segment, path;
var movePath = false;

var firstLayer = project.activeLayer;
var secondLayer = new Layer();

//var url = 'http://assets.paperjs.org/images/marilyn.jpg';
var url = 'http://paperex.local/paperex/map-of-arizona-cities.gif';
var raster = new Raster(url);
raster.position = view.center;

// If you create a Raster using a url, you can use the onLoad
// handler to do something once it is loaded:
raster.onLoad = function() {
	this.bounds.width = view.bounds.width;
    this.bounds.height = view.bounds.height;	
    console.log('The image has loaded.');
};

secondLayer.sendToBack();

firstLayer.activate();

onMouseDown = function(event) {
	segment = path = null;
	var hitResult = project.hitTest(event.point, hitOptions);

	if (!hitResult || hitResult.type == 'pixel') {
		myPath = new Path();
		myPath.strokeColor = 'black';
		
		if (!hitResult) return;
		
		if (hitResult.type == 'pixel') {
		    var hitItem = hitResult.item;
		    hitItem.selected = false;
		}
		return;
	}
    
	if (event.modifiers.shift) {
		if (hitResult.type == 'segment') {
			hitResult.segment.remove();
		};
		return;
	}

	if (hitResult) {
		path = hitResult.item;
		if (hitResult.type == 'segment') {
			segment = hitResult.segment;
		} else if (hitResult.type == 'stroke') {
			var location = hitResult.location;
			segment = path.insert(location.index + 1, event.point);
			path.smooth();
		}
	}
	movePath = hitResult.type == 'fill';
	if (movePath)
		firstLayer.addChild(hitResult.item);	
}

onMouseMove = function(event) {	
	firstLayer.selected = false;
	if (event.item) {
	    var eItem = event.item;
	    var hTest = eItem.hitTest(event.point);

	    if (hTest.type != 'pixel') {
	        path = event.item;
		    event.item.selected = true;
	    }

        var items = firstLayer.children;
	    for (var i=0; i < items.length; i++) {
	        if (items[i].selected) {
	            items[i].opacity = 0.7;
	            items[i].fillColor = 'green';
	        }
	        else {
	            items[i].opacity = 0.5;
	            items[i].fillColor = 'white';
	        }
	    }
	}
}

onMouseDrag = function(event) {
	if (segment) {
		segment.point += event.delta;
		path.smooth();
	} else if (path) {
		path.position += event.delta;
	} else {
		myPath.add(event.point);
	}
}

onMouseUp = function(event) {
    if (segment || path)
        return;
	myPath.fillColor = 'white';
	myPath.opacity = 0.5;
	myPath.closed = true;
	myPath.simplify();
	path = myPath;
}

tool.onKeyDown = function(event) {
    if (event.key == 'delete') {            
        if (path.selected)
            path.remove();
    }
}