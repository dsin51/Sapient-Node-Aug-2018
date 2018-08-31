let querystring = require('querystring'),
	calculator = require('./calculator');

module.exports = function(req, res, next){
	if (req.urlObj.pathname === '/calculator'){
		let data = req.method === 'POST' ? req.bodyData : req.queryData;
		let operator = data.op,
			n1 = parseInt(data.n1),
			n2 = parseInt(data.n2);
		let result = calculator[operator](n1,n2);
		res.write(result.toString());
		res.end();
		next();
	}  else {
		next();
	}
}