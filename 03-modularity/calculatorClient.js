let fs = require('fs');
let calculator = require('./calculator'),
	commandParser = require('./commandParser');

let fileContents = fs.readFileSync('./calculator.dat', {encoding : 'utf8'});
let commands = commandParser(fileContents);
/*for(let command of commands){
	let {action, n1, n2} = command;
	console.log(calculator[action](n1, n2));
}*/

commands
	.forEach(({action, n1, n2}) => console.log(calculator[action](n1, n2)));
