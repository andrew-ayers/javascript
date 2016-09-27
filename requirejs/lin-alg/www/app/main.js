define(function (require) {
    var print = require('common/print');
    var lina = require('math/lin-alg');

    print(lina.hello());

    var v1 = lina.rowV( [ 1, 2, 3 ] );
    var v2 = lina.colV( [ 2, 4, 6 ] );

    var res = lina.multiply(v1, v2);

    print(res);
});
