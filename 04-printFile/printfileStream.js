let fs = require('fs');

var stream = fs.createReadStream('./sample.txt', { encoding : 'utf8'}); //=> Readable Stream
// events => open, data, end, close & error

let readCount = 0;
stream.on('data', function(chunk){
	++readCount;
	console.log(chunk);
});

stream.on('end', function(){
	console.log('Thats all folks!!');
	console.log('readCount = ', readCount);
});

stream.on('error', function(err){
	conosle.log(err);
});
