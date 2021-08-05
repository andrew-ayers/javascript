define(function (require) {
    var print = require('common/print');

    return {
        hello: function () {
            return 'Welcome to the Linear Algebra Library Test-Bed!';
        },

        size: function (mat){
            if (mat instanceof Array) {
                return [mat.length].concat(this.size(mat[0]));///.reverse();
            } else {
                return [];
            }
        },

        scalar: function (n) {
            return {
                value: n,
                type: 'scalar'
            };
        },

        matrix: function (values, rows, cols) {
            if (values instanceof Array) {
                if (values.length == (rows * cols)) {
                    var arr = [];

                    for (var j = 0; j < rows; j++) {
                        var row = [];
                        for (var i = 0; i < cols; i++) {
                            row[i] = values[i + (cols * j)];
                        }
                        arr[j] = row;
                    }

                    return {
                        value: arr,
                        type: 'matrix',
                        size: this.size(arr)
                    };
                }
            }
        },

        dot: function (a, b) {
            if (a.type === 'matrix' && b.type === 'matrix') {
                if (a.size[1] === b.size[0]) {
                    var rows = a.size[0];
                    var cols = b.size[1];

                    var arr = [];
                    for (var j = 0; j < rows; j++) {
                        arr[j] = [];
                        for (var i = 0; i < cols; i++) {
                            arr[j][i] = 0;
                            for (var v = 0; v < a.size[1]; v++) {
                                arr[j][i] += (a.value[j][v] * b.value[v][i]);
                            }
                        }
                    }

                    return {
                        value: arr,
                        type: 'matrix',
                        size: this.size(arr)
                    };
                }
            }
        }
    };
});
