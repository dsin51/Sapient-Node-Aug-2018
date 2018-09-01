let mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const conn = mongoose.createConnection('mongodb://localhost:27017/learning');

const BugModel = new Schema({
	name : String,
	isClosed : Boolean,
});

const Bug = conn.model('bugs', BugModel);


function getAll(){
	/*return new Promise(function(resolveFn, rejectFn){
		Bug.find({}, function(err, bugs){
			if (!err)
				return resolveFn(bugs);
			console.log(err)
			rejectFn(err);
		});	
	});*/

	return Bug.find({});
}

function addNew(newBugData){
	let newBug = new Bug();
	newBug.name = newBugData.name;
	newBug.isClosed = newBugData.isClosed;
	return newBug.save();
}

module.exports = { getAll, addNew }