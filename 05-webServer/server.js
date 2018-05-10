const http = require('http'),
	fs = require('fs'),
	path = require('path');

let server = http.createServer(function(req /* ReadableStream */, res /* WritableStream */){
	console.log(`A new connection is established for ${req.url}`);
	let resourceName = req.url === '/' ? '/index.html' : req.url,
		resource = path.join(__dirname, resourceName);
	if (!fs.existsSync(resource)){
		res.statusCode = 404;
		res.end();
		return;
	}
	fs.createReadStream(resource).pipe(res);
});

server.listen(8080);
