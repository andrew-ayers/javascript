// See:
//   http://stackoverflow.com/questions/23532116/creating-a-zoomable-high-performance-grid-that-gets-redrawn-on-each-zoom-leve
//   http://jsfiddle.net/39c3w/52/
//
// Also:
//   http://matthiasberth.com/articles/stable-zoom-and-pan-in-paperjs/
//   https://gist.github.com/ryascl/4c1fd9e2d5d0030ba429

//First define the zoom tool properties

var toolZoomIn = new paper.Tool();

toolZoomIn.distanceThreshold = 8;
toolZoomIn.mouseStartPos = new paper.Point();
toolZoomIn.zoomFactor = 1.3;

//Let's draw a reference rectangle to compare between grids.

var rectangle = new Rectangle(new Point(200, 50), new Point(350, 100));
var path = new Path.Rectangle(rectangle);
path.fillColor = '#e9e9ff';
path.selected = true;

//Some instructions on how to use the canvas.
var text = new PointText(0,200);
text.content = 'Scroll Up/Down to zoom. Watch the reference rectangle';
text.style = {
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    fontSize: 20,
    fillColor: 'red',
    justification: 'left'
};

//Let's start

$(document).ready(function(e) {

//Define a ''global'' object, the Paper.js Group that will hold all the horizontal/vertical lines.

    var gridGroup = new paper.Group;

//The function that draws horizontal/vertical lines

    function drawGridOnScreen(){

//Width/Height per cell on the grid variables

        var widthPerCell = 30;
        var heightPerCell = 30;

//Draw the grid lines and add them into the global group above that holds all the lines

        var drawGridLines = function(num_rectangles_wide, num_rectangles_tall, boundingRect) {

            for (var i = 0; i <= num_rectangles_wide; i++) {
                correctedBoundingRectLeft = Math.ceil(boundingRect.left/widthPerCell) * widthPerCell;
                var xPos = correctedBoundingRectLeft + i * widthPerCell;
                var topPoint = new paper.Point(xPos, boundingRect.top);
                var bottomPoint = new paper.Point(xPos, boundingRect.bottom);
                var aLine = new paper.Path.Line(topPoint, bottomPoint);
                aLine.strokeColor = '968d8d';
                gridGroup.addChild(aLine);
            }

            for (var i = 0; i <= num_rectangles_tall; i++) {
                correctedBoundingRectTop = Math.ceil(boundingRect.top/heightPerCell) * heightPerCell;
                var yPos = correctedBoundingRectTop + i * heightPerCell;
                var leftPoint = new paper.Point(boundingRect.left, yPos);
                var rightPoint = new paper.Point(boundingRect.right, yPos);
                var aLine = new paper.Path.Line(leftPoint, rightPoint);
                aLine.strokeColor = '968d8d';
                gridGroup.addChild(aLine);
            }
        }
//Find out how many cells we need vertically/horizontally first and then call the ''grid maker'' function to draw them.

        var numberOfVerticalCells = paper.view.bounds.width / widthPerCell;
        var numberOfHorizontalCells = paper.view.bounds.height / heightPerCell;

        drawGridLines(numberOfVerticalCells, numberOfHorizontalCells, paper.view.bounds);
    }

//This function get's called on each mouse zoom interval. If there is a previously drawed grid, delete it and start over.

    function drawGrid(){

        if (gridGroup.isEmpty()) {
            drawGridOnScreen();
        }

        else {
            gridGroup.removeChildren();
            drawGridOnScreen();
        }

    }


//Start of mouse scroll zoom. The mouse zoom ''homes'' in on the current mouse position.
//Each mouse scroll calls the drawGrid function which checks if there is a previously drawed grid, deletes it and start drawing a new grid..
    $('#canvas').bind('mousemove', function(e) {
        e.preventDefault();
        e = e || window.event;

        if (e.which == 1) { // 1=Lmb, 2=Mmb, 3=Rmb
            var moveFactor = -toolZoomIn.zoomFactor / 1.5;// - 1.0;

            var delta = new Point(e.originalEvent.movementX, e.originalEvent.movementY);

            delta = delta.multiply(moveFactor);

            paper.view.center = paper.view.center.add(delta);

            //Call draw grid
            //drawGrid();
        }
    });

    $('#canvas').bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(e){

        var delta = 0;
        var children = project.activeLayer.children;
        var upperZoomLimit = 30;
        var lowerZoomLimit = 0.40;

        e.preventDefault();
        e = e || window.event;
        if (e.type == 'mousewheel') {       //this is for chrome/IE
            delta = e.originalEvent.wheelDelta;
        }
        else if (e.type == 'DOMMouseScroll') {  //this is for FireFox
            delta = e.originalEvent.detail*-1;  //FireFox reverses the scroll so we force to to re-reverse...
        }

        if((delta > 0) && (paper.view.zoom<upperZoomLimit)) {
            //scroll up
            var point = new Point(e.originalEvent.offsetX, e.originalEvent.offsetY);
            point = paper.view.viewToProject(point);
            var zoomCenter = point.subtract(paper.view.center);
            var moveFactor = toolZoomIn.zoomFactor - 1.0;
            paper.view.zoom *= toolZoomIn.zoomFactor;
            paper.view.center = paper.view.center.add(zoomCenter.multiply(moveFactor / toolZoomIn.zoomFactor));
            toolZoomIn.mode = '';

            //Call draw grid
            //drawGrid();
        }

        else if((delta < 0) && (paper.view.zoom>lowerZoomLimit)){ //scroll down
            var point = new Point(e.originalEvent.offsetX, e.originalEvent.offsetY);
            point = paper.view.viewToProject(point);
            var zoomCenter = point.subtract(paper.view.center);
            var moveFactor = toolZoomIn.zoomFactor - 1.0;
            paper.view.zoom /= toolZoomIn.zoomFactor;
            paper.view.center = paper.view.center.subtract(zoomCenter.multiply(moveFactor))

            //Call draw grid
            //drawGrid();
        }
    });

    view.onFrame = function(event) {
        drawGrid();
    }
});