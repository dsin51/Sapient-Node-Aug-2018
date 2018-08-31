module.exports = function(res){
	console.log('notFoundHandler - sending 404');
	res.statusCode = 404;
	res.end();
}