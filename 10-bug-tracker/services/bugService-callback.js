let fs = require('fs'),
	path = require('path');

let bugsList = [];
let dataFile = path.join(__dirname, '../data/bugs.json');

function getAll(callback){
	fs.readFile(dataFile, { encoding : 'utf8'}, function(err, fileContents){
		if (err){
			return callback(err, null);
		}
		bugsList = JSON.parse(fileContents);
		callback(null, bugsList);
	});
}


function addNew(newBugData, callback){
	let newBugId = bugsList.reduce((result, bug) => bug.id > result ? bug.id : result, 0) + 1;
	let newBug = {...newBugData, id : newBugId};
	bugsList.push(newBug);
	fs.writeFile(dataFile, JSON.stringify(bugsList), function(err, cb){
		if (err){
			return callback(err, null);
		}
		callback(null, newBug);
	});
}
module.exports = { getAll, addNew };