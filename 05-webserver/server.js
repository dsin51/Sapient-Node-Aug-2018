let http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url');

let server = http.createServer(function(req, res){
	let urlObj = url.parse(req.url === '/' ? '/index.html' : req.url);
	let resource = path.join(__dirname, urlObj.pathname);
	if (!fs.existsSync(resource)){
		res.statusCode = 404;
		res.end();
		return;
	}
	let stream = fs.createReadStream(resource);
	stream.pipe(res);
});

server.listen(8080);
console.log('web server running on 8080');