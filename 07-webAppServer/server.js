const http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

let staticResourceExtns = ['.html', '.js', '.css', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resource){
	let extn = path.extname(resource);
	return staticResourceExtns.indexOf(extn) > -1;
}
let server = http.createServer(function(req /* ReadableStream */, res /* WritableStream */){
	
	let urlObj = url.parse(req.url);
	console.log(`${req.method} \t ${urlObj.pathname}`);
	let resourceName = urlObj.pathname === '/' ? '/index.html' : urlObj.pathname,
		resource = path.join(__dirname, resourceName);
	if (isStatic(resource)){
		if (!fs.existsSync(resource)){
			res.statusCode = 404;
			res.end();
			return;
		}
		fs.createReadStream(resource).pipe(res);
	} else if (urlObj.pathname === '/calculator' && req.method === 'GET') {
		let queryData = querystring.parse(urlObj.query);
		let { op, n1, n2 } = queryData;
		let result = calculator[op](parseInt(n1), parseInt(n2));
		res.write(result.toString());
		res.end();
	} else if (urlObj.pathname === '/calculator' && req.method === 'POST') {
		let rawData = '';
		req.on('data', function(chunk){
			rawData += chunk;
		});
		req.on('end', function(){
			let queryData = querystring.parse(rawData);
			let { op, n1, n2 } = queryData;
			let result = calculator[op](parseInt(n1), parseInt(n2));
			res.write(result.toString());
			res.end();
		});
		
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8080);












