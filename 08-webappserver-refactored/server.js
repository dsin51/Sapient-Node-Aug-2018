let http = require('http'),
	path = require('path'),
	chalk = require('chalk');
	
let app = require('./app'),
	dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	calculatorHandler = require('./calculatorHandler'),
	notFoundHandler = require('./notFoundHandler');

app.use(dataParser);
app.use(function(req, res, next){
	console.log(chalk.bold.red(req.method) + '\t' + chalk.blue(req.urlObj.pathname));
	next();
});

app.use(serveStatic(path.join(__dirname, 'public')));
app.use(calculatorHandler);
app.use(notFoundHandler);

let server = http.createServer(app);

server.listen(8080);
console.log('webapp server running on 8080');