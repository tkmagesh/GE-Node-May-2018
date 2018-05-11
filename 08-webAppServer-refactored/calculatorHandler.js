const calculator = require('./calculator');
	
module.exports = function(req, res, next){
	if (req.urlObj.pathname === '/calculator') {
		let data = req.method === 'GET' ? req.queryData : req.bodyData;
		let { op, n1, n2 } = data;
		let result = calculator[op](parseInt(n1), parseInt(n2));
		res.write(result.toString());
		res.end();
	}
	next();
}