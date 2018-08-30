module.exports = function(fileContents){
	/*let result = [];
	let lines = fileContents.split('\n');
	for(let line of lines){
		let [action, x, y] = line.split(',');
		let command = { action, n1 : parseInt(x), n2 : parseInt(y)};
		result.push(command);
	}
	return result;*/

	return fileContents
		.split('\n')
		.map(line => line.split(','))
		.map(([action, x, y]) => ({ action, n1 : parseInt(x), n2 : parseInt(y)}));
}