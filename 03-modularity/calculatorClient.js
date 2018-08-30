
let calculator = require('./calculator'),
	commandParser = require('./commandParser');

commandParser('./calculator.dat')
	.forEach(({action, n1, n2}) => console.log(calculator[action](n1, n2)));
