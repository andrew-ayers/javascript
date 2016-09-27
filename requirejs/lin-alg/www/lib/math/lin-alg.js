define(function (require) {
    var print = require('common/print');

    return {
        hello: function () {
            return 'Welcome to the Linear Algebra Library Test-Bed!';
        },

        rowV: function (v) {
            return v.slice();
        },

        colV: function (v) {
            return new Array(v);
        },

        multiply: function (vec1, vec2) {
            print(vec1);
            print(vec2);

            if (vec1.length > vec2.length) {
                return 'dot';
            }
            else if (vec2.length > vec1.length) {
                return 'tensor';
            }
            else {
                return 'square';
            }
        }
    };
});
