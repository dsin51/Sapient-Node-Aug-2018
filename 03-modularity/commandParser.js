let fs = require('fs');
module.exports = function(file){
	/*let result = [];
	let lines = fileContents.split('\n');
	for(let line of lines){
		let [action, x, y] = line.split(',');
		let command = { action, n1 : parseInt(x), n2 : parseInt(y)};
		result.push(command);
	}
	return result;*/
	let fileContents = fs.readFileSync(file, {encoding : 'utf8'});
	return fileContents
		.split('\n')
		.map(line => line.split(','))
		.map(([action, x, y]) => ({ action, n1 : parseInt(x), n2 : parseInt(y)}));
}