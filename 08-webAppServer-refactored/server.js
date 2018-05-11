const http = require('http'),
	dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	logger = require('./logger'),
	calculatorHandler = require('./calculatorHandler'),
	notFoundHandler = require('./notFoundHandler');

let server = http.createServer(function(req, res){
	dataParser(req);
	logger(req);
	serveStatic(req, res);
	calculatorHandler(req, res);
	notFoundHandler(res);
});

server.listen(8080);












