let querystring = require('querystring'),
	calculator = require('./calculator');

module.exports = function(req, res, next){
	if (req.urlObj.pathname === '/calculator' && req.method === 'GET'){
		let queryData = querystring.parse(req.urlObj.query);
		let operator = queryData.op,
			n1 = parseInt(queryData.n1),
			n2 = parseInt(queryData.n2);
		let result = calculator[operator](n1,n2);
		res.write(result.toString());
		res.end();
		next();
	} else if (req.urlObj.pathname === '/calculator' && req.method === 'POST'){
		let rawData = '';
		req.on('data', function(chunk){
			rawData += chunk;
		});
		req.on('end', function(){
			let queryData = querystring.parse(rawData);
			let operator = queryData.op,
				n1 = parseInt(queryData.n1),
				n2 = parseInt(queryData.n2);
			let result = calculator[operator](n1,n2);
			res.write(result.toString());
			res.end();
			next();
		});
	} else {
		next();
	}
}