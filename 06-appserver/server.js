let http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

let server = http.createServer(function(req, res){
	let urlObj = url.parse(req.url === '/' ? '/index.html' : req.url);
	let queryData = querystring.parse(urlObj.query);
	if (urlObj.pathname === '/calculator'){
		let operator = queryData.op,
			n1 = parseInt(queryData.n1),
			n2 = parseInt(queryData.n2);
		let result = calculator[operator](n1,n2);
		res.write(result.toString());
		res.end();
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8585);
console.log('calculator server running on 8585');