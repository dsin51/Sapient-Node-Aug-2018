let http = require('http'),
	app = require('./app');
	
let dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	calculatorHandler = require('./calculatorHandler'),
	notFoundHandler = require('./notFoundHandler');


app.use(dataParser);
app.use(serveStatic);
app.use(calculatorHandler);
app.use(notFoundHandler);

let server = http.createServer(app);

server.listen(8080);
console.log('webapp server running on 8080');