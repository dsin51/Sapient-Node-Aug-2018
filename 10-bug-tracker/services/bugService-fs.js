let path = require('path'),
	bluebird = require('bluebird'),
	fs = bluebird.promisifyAll(require('fs'));

let bugsList = [];
let dataFile = path.join(__dirname, '../data/bugs1.json');

async function getAll(){
	/*return new Promise(function(resolveFn, rejectFn){
		fs.readFile(dataFile, {encoding : 'utf8'}, function(err, fileContents){
			if (err){
				rejectFn(err);
				return;
			}
			bugsList = JSON.parse(fileContents);
			resolveFn(bugsList);
		});
	});*/

	/*return new Promise(function(resolveFn, rejectFn){
		fs.readFileAsync(dataFile, { encoding : 'utf8'})
			.then(function(rawData){
				bugsList = JSON.parse(rawData);
				resolveFn(bugsList);
			});
	});*/

		/*return fs
			.readFileAsync(dataFile, { encoding : 'utf8'})
			.then(function(rawData){
				bugsList = JSON.parse(rawData);
				return bugsList
			});*/
	try {	
		let rawData = await fs.readFileAsync(dataFile, { encoding : 'utf8'})
		bugsList = JSON.parse(rawData);
		return bugsList;
	} catch (err){
		throw err;
	}
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
