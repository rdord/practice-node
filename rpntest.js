var rpn = require('./rpn');

var result = rpn.calc([2, 3, 4, '+', '-']); //-5

console.log(result);
