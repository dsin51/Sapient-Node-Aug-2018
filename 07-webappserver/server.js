let http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

var staticExtns = ['.html', '.css', '.js', '.xml', '.json', '.png', '.jpg', '.ico'];

function isStatic(resource){
	var extn = path.extname(resource);
	return staticExtns.indexOf(extn) >= 0;
}

let server = http.createServer(function(req, res){
	let urlObj = url.parse(req.url === '/' ? '/index.html' : req.url);
	if (isStatic(urlObj.pathname)){
		let resource = path.join(__dirname, urlObj.pathname);
		if (!fs.existsSync(resource)){
			res.statusCode = 404;
			res.end();
			return;
		}
		let stream = fs.createReadStream(resource);
		stream.pipe(res);
	} else if (urlObj.pathname === '/calculator' && req.method === 'GET'){
		let queryData = querystring.parse(urlObj.query);
		let operator = queryData.op,
			n1 = parseInt(queryData.n1),
			n2 = parseInt(queryData.n2);
		let result = calculator[operator](n1,n2);
		res.write(result.toString());
		res.end();
	} else if (urlObj.pathname === '/calculator' && req.method === 'POST'){
		let queryData = querystring.parse(urlObj.query);
		let operator = queryData.op,
			n1 = parseInt(queryData.n1),
			n2 = parseInt(queryData.n2);
		let result = calculator[operator](n1,n2);
		res.write(result.toString());
		res.end();
	}else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8080);
console.log('webapp server running on 8080');