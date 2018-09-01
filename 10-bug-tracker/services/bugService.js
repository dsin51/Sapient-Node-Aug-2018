let fs = require('fs'),
	path = require('path');

let bugsList = [];
let dataFile = path.join(__dirname, '../data/bugs1.json');

function getAll(){
	return new Promise(function(resolveFn, rejectFn){
		fs.readFile(dataFile, {encoding : 'utf8'}, function(err, fileContents){
			if (err){
				rejectFn(err);
				return;
			}
			bugsList = JSON.parse(fileContents);
			resolveFn(bugsList);
		});
	});
}


function addNew(newBugData, callback){
	let newBugId = bugsList.reduce((result, bug) => bug.id > result ? bug.id : result, 0) + 1;
	let newBug = {...newBugData, id : newBugId};
	bugsList.push(newBug);
	return new Promise(function(resolveFn, rejectFn){
		fs.writeFile(dataFile, JSON.stringify(bugsList), function(err, cb){
			if (err){
				return rejectFn(err);
			}
			resolveFn(newBug);
		});
	});
	
}
module.exports = { getAll, addNew };