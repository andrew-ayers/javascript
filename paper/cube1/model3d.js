/*
 * 0                 1
 *  +---------------+
 *  |               |
 *  |               |
 *  |      top      |
 *  |               |
 *  |               |
 *  +---------------+
 * 3                 2
 *
 * 4                 5
 *  +---------------+
 *  |               |
 *  |               |
 *  |     bottom    |
 *  |               |
 *  |               |
 *  +---------------+
 * 7                 6
 *
 */
var model = {
    shape: {
        planes: [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
        ],

        vectors: [
            {-1, -1, },
            {},
            {},
            {},
            {},
            {},
            {},
            {}
        ]
    },

    color: {
        strokeColor: 'red',
        //fillColor: 'blue'
    }
}
var Model3D = function(model) {
    this.model = {
        data: model.data,
        scale: model.scale
    };

    this.render = function() {

    }

    this.project = function() {

    }
}