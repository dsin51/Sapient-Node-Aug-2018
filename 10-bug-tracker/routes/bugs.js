var express = require('express');
var router = express.Router();


let bugsList = [
	{id : 1, name : 'Application is not responding', isClosed : false},
	{id : 2, name : 'User actions not recognized', isClosed : true},
	{id : 3, name : 'Server communication failure', isClosed : false},
];

router.get('/', function(req, res, next){
	res.json(bugsList);
});

router.post('/', function(req, res, next){
	let newBugData = req.body;
	let newBugId = bugsList.reduce((result, bug) => bug.id > result ? bug.id : result, 0) + 1;
	let newBug = {...newBugData, id : newBugId};
	bugsList.push(newBug);
	res.status(201).json(newBug);
});

router.put('/:id', function(req,res,next){
	let replacementBug =  req.body,
		bugIdToReplace = parseInt(req.params.id),
		bugToReplace = bugsList.find(bug => bug.id === bugIdToReplace);
	if (bugToReplace){
		bugsList = bugsList.map(bug => bug.id === bugToReplace.id ? replacementBug : bug);
		res.status(200).json(replacementBug);
	} else {
		res.status(404).end();
	}
	
})

router.patch('/:id', function(req,res,next){
	let dataToUpdate =  req.body,
		bugIdToUpdate = parseInt(req.params.id),
		bugToUpdate = bugsList.find(bug => bug.id === bugIdToUpdate);
		
	if (bugToUpdate){
		let updatedBug = {...bugToUpdate, ...dataToUpdate};
		bugsList = bugsList.map(bug => bug.id === bugToUpdate.id ? updatedBug : bug);
		res.status(200).json(updatedBug);
	} else {
		res.status(404).end();
	}
});

router.delete('/:id', function(req, res, next){
	let bugIdToDelete = parseInt(req.params.id),
		bugToDelete = bugsList.find(bug => bug.id === bugIdToDelete);
	if (bugToDelete){
		bugsList = bugsList.filter(bug => bug.id !== bugIdToDelete);
		res.status(200).json({});
	} else {
		res.status(404).end();
	}
})

module.exports = router;














