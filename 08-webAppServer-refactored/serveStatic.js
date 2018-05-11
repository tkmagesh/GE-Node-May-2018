const path = require('path'),
	fs = require('fs');
let staticResourceExtns = ['.html', '.js', '.css', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resource){
	let extn = path.extname(resource);
	return staticResourceExtns.indexOf(extn) > -1;
}

module.exports = function(req, res){
	let resourceName = req.urlObj.pathname === '/' ? '/index.html' : req.urlObj.pathname,
		resource = path.join(__dirname, resourceName);
	if (isStatic(resource)){
		if (!fs.existsSync(resource)){
			res.statusCode = 404;
			res.end();
			return;
		}
		fs.createReadStream(resource).pipe(res);
	} 
}