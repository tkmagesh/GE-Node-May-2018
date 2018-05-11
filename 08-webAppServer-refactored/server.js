const http = require('http'),
	path = require('path'),
	app = require('./app'),
	dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	logger = require('./logger'),
	calculatorHandler = require('./calculatorHandler'),
	notFoundHandler = require('./notFoundHandler');

app.use(dataParser);
app.use(logger);
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(calculatorHandler);
app.use(notFoundHandler);

http.createServer(app).listen(8080);












