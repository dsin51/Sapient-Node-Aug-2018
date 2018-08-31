let path = require('path'),
	fs = require('fs');

var staticExtns = ['.html', '.css', '.js', '.xml', '.json', '.png', '.jpg', '.ico'];

function isStatic(resource){
	var extn = path.extname(resource);
	return staticExtns.indexOf(extn) >= 0;
}

module.exports = function(req, res, next){
	if (isStatic(req.urlObj.pathname)){
		let resource = path.join(__dirname, req.urlObj.pathname);
		if (!fs.existsSync(resource)){
			res.statusCode = 404;
			res.end();
			return;
		}
		let stream = fs.createReadStream(resource);
		stream.pipe(res);
		stream.on('end', function(){
			next();
		});
	} else {
		next();
	}
}