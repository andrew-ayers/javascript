var triangle = function(args) {
	var path = new Path(args.color);

	path.add(args.p0, args.p1, args.p2, args.p0);
}

view.onFrame = function(event) {
    project.activeLayer.removeChildren();

    for (var i = 0; i < 100; i++) {
        var color = new Color(Math.random(), Math.random(), Math.random());

        var p0 = new Point(Math.random() * 800, Math.random() * 600);
        var p1 = new Point(Math.random() * 800, Math.random() * 600);
        var p2 = new Point(Math.random() * 800, Math.random() * 600);

        triangle({
            p0: p0,
            p1: p1,
            p2: p2,
            color: {
                strokeColor: color,
                fillColor: color
            }
        });
    }
}