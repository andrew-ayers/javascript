var raster = new Raster({
    source: 'http://paperex.local/scaletest1/puppy.jpg'
});

var shape;

raster.onLoad = function() {
    var canvas = $('#myCanvas');
    var ctx = canvas[0].getContext('2d');

    ctx.canvas.width = raster.width;
    ctx.canvas.height = raster.height;

    //raster.width = 300;
    //raster.height = 300;

    var pos = new Point(ctx.canvas.width / 2, ctx.canvas.height / 2);

    raster.setPosition(pos);

    shape = new Shape.Circle(new Point(100,100), 100);
    shape.strokeColor = 'red';
};

var tool = new Tool();
var origin = new Point(0, 0);

tool.onKeyDown = function(event) {
    if (event.key == '.') {
        raster.scale(1.05, origin);
        shape.scale(1.05, origin);
    }
    else if (event.key == ',') {
        raster.scale(0.95, origin);
        shape.scale(0.95, origin);
    }
};