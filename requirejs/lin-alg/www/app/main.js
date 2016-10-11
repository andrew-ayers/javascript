define(function (require) {
    var print = require('common/print');
    var lina = require('math/lin-alg');

    console.log(lina.hello());

    // Y x X
    var sca1 = lina.scalar(1);
    var mat1 = lina.matrix([1, 2, 3], 3, 1); // [[ 1, 2, 3 ]] => 3 x 1
    var mat2 = lina.matrix([1, 2, 3], 1, 3); // [[ 1 ], [ 2 ], [ 3 ]] => 1 x 3
    var mat3 = lina.matrix([1, 2, 3, 4], 2, 2); // [[ 1, 2 ], [ 3, 4 ]] => 2 x 2
    var mat4 = lina.matrix([1, 2, 3, 4, 5, 6], 3, 2); // [[ 1, 3, 5 ], [ 2, 4, 6 ] ] => 3 x 2
    var mat5 = lina.matrix([1, 2, 3, 4, 5, 6], 2, 3); // [[ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ] => 2 x 3
    var mat6 = lina.matrix([1, 2, 3, 4, 5, 6, 7, 8, 9], 3, 3); // [[ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6, 9 ]] => 3 x 3

    console.log('scalar', sca1);
    console.log('3 x 1', mat1);
    console.log('1 x 3', mat2);
    console.log('2 x 2', mat3);
    console.log('3 x 2', mat4);
    console.log('2 x 3', mat5);
    console.log('3 x 3', mat6);

    var matA = mat5;
    console.log('matA - 2 x 3', matA);

    var matB = lina.matrix([7, 8, 9, 10, 11, 12], 3, 2); // [[ 7, 9, 11 ], [ 8, 10, 12 ]] => 3 x 2
    console.log('matB - 3 x 2', matB);

    var res = lina.dot(matA, matB);
    console.log('dot-product', res);
});
