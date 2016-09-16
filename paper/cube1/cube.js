var myMath3D = new Math3D(400, 300, 200);

var model = [
    {
        x: -1,
        y: 0,
        z: 0
    },

    {
        x: 0,
        y: -1,
        z: 0
    },

    {
        x: 1,
        y: 0,
        z: 0
    }
];

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

    triangle({
        p0: p0,
        p1: p1,
        p2: p2,
        color: {
            strokeColor: 'red',
            //fillColor: color
        }
    });
}

var rx = 0, ry = 0, rz = 0;

view.onFrame = function(event) {
    project.activeLayer.removeChildren();

    rx += (rx < Math.PI * 2 ? 0.01 : -Math.PI * 2);
    ry += (ry < Math.PI * 2 ? 0.02 : -Math.PI * 2);
    rz += (rz < Math.PI * 2 ? 0.04 : -Math.PI * 2);

    drawModel(rx, ry, rz);
};
