let path = require('path'),
	fs = require('fs');

var staticExtns = ['.html', '.css', '.js', '.xml', '.json', '.png', '.jpg', '.ico'];

function isStatic(resource){
	var extn = path.extname(resource);
	return staticExtns.indexOf(extn) >= 0;
}

module.exports = function(req, res){
	if (isStatic(req.urlObj.pathname)){
		let resource = path.join(__dirname, req.urlObj.pathname);
		if (!fs.existsSync(resource)){
			res.statusCode = 404;
			res.end();
			return;
		}
		let stream = fs.createReadStream(resource);
		//stream.pipe(res);
		stream.on('data', function(chunk){
			console.log('serveStatic - data event triggered');
			res.write(chunk);
		});
		stream.on('end', function(){
			console.log('serveStatic - end event triggered');
			res.end();
		})
	}
}