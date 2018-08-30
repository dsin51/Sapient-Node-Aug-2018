let http = require('http');

let server = http.createServer(function(req, res){
	console.log('a new connection is established');
	res.write('<h1>Welcome to Node.js</h1>');
	res.end();
});

server.listen(8080);