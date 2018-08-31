let http = require('http');
	

let dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	calculatorHandler = require('./calculatorHandler'),
	notFoundHandler = require('./notFoundHandler');

let server = http.createServer(function(req, res){
	dataParser(req);
	serveStatic(req, res);
	calculatorHandler(req, res);
	notFoundHandler(res);
});

server.listen(8080);
console.log('webapp server running on 8080');