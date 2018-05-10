// /calculator?op=add&n1=100&n2=200

const http = require('http'),
	url = require('url'),
	querysting = require('querystring'),
	calculator = require('./calculator');

let server = http.createServer(function(req /* ReadableStream */, res /* WritableStream */){
	let urlObj = url.parse(req.url),
		queryData = querysting.parse(urlObj.query);
	if (urlObj.pathname !== '/calculator'){
		res.statusCode = 404;
		res.end();
		return;
	}
	let { op, n1, n2 } = queryData;
	let result = calculator[op](parseInt(n1), parseInt(n2));
	res.write(result.toString());
	res.end();
});

server.listen(8080);
