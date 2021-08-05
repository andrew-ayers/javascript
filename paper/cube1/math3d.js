var Math3D = function(cx, cy, dist) {
    this.view = {
        cx: cx,
        cy: cy,
        dist: dist
    };

    this.scale = function(v, s) {
        return {
            x: v.x * s.x,
            y: v.y * s.y,
            z: v.z * s.z
        }
    };

    this.translate = function(v, t) {
        return {
            x: v.x + t.x,
            y: v.y + t.y,
            z: v.z + t.z
        }
    };

    this.rotate = function(v, r) {
        var yp1 = v.z * Math.sin(r.x) + v.y * Math.cos(r.x);
        var zp1 = v.z * Math.cos(r.x) - v.y * Math.sin(r.x);

        var xp2 = zp1 * Math.sin(r.y) + v.x * Math.cos(r.y);
        var zp2 = zp1 * Math.cos(r.y) - v.x * Math.sin(r.y);

        var xp3 = yp1 * Math.sin(r.z) + xp2 * Math.cos(r.z);
        var yp3 = yp1 * Math.cos(r.z) - xp2 * Math.sin(r.z);

        return {
            x: xp3,
            y: yp3,
            z: zp2
        }
    };

    this.project = function(v) {
        return {
            x: this.view.cx + (this.view.dist * v.x / v.z),
            y: this.view.cy + (this.view.dist * v.y / v.z)
        }
    };
};