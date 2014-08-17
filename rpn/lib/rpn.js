exports.version = '0.5.0';

//[2, 3, 4, '+', '-'] => [2, 7, '-'] => -5

exports.calc = function (inputs) {
	var stack = [];

	for (var i = 0; i < inputs.length; i++) {
		switch (inputs[i]) {
			case '+':
			case '-':
			case '*':
			case '/':
				if (stack.length < 2) {  //[2, '+'] will not work, (2 + ?)
					return false;
				}
				doMath(stack, inputs[i]); //use current operator on the numbers in the stack
				break;

			default:
				var num = parseFloat(inputs[i]);

				if(isNaN(num)){
					return false;
				}
				stack.push(num); //push numbers to the stack
				break;
		}
	}

	if (stack.length != 1) {
		return false;
	}
	return stack.pop();
};

function doMath (stack, operator) {
	var b = stack.pop(),
			a = stack.pop();

	switch (operator) {
		case '+':
			stack.push(a + b);
			break;
		case '-':
			stack.push(a - b);
			break;
		case '*':
			stack.push(a * b);
			break;
		case '/':
			stack.push(a / b);
			break;
		default:
			throw new Error('Unexpected operator');
	}
}

