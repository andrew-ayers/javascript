var drawTriangle = function(args) {


	var path = new Path(args.color);

	path.add(args.p0, args.p1, args.p2, args.p0);
};

var drawModel = function(rx, ry, rz) {
    var view = [];

    for (var i = 0; i < 3; i++) {
        var p = model[i];

        p = myMath3D.rotate(p, {x: rx, y: ry, z: rz});

        p = myMath3D.translate(p, {x: 0, y: 0, z: 2});

        p = myMath3D.scale(p, {x: 100, y: 100, z: 100});

        p = myMath3D.project(p);

        view[i] = p;
    }

    console.log(view);

    //var color = new Color(Math.random(), Math.random(), Math.random());

    var p0 = new Point(view[0].x, view[0].y);
    var p1 = new Point(view[1].x, view[1].y);
    var p2 = new Point(view[2].x, view[2].y);

    drawTriangle({
        points: {
            p0: p0,
            p1: p1,
            p2: p2,
        },
        color: {
            strokeColor: 'red',
            //fillColor: color
        }
    });
}