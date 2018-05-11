const querystring = require('querystring'),
	calculator = require('./calculator');
	
module.exports = function(req, res){
	if (req.urlObj.pathname === '/calculator' && req.method === 'GET') {
		let queryData = querystring.parse(req.urlObj.query);
		let { op, n1, n2 } = queryData;
		let result = calculator[op](parseInt(n1), parseInt(n2));
		res.write(result.toString());
		res.end();
	} else if (req.urlObj.pathname === '/calculator' && req.method === 'POST') {
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
		
	}
}