const path = require('path'),
	fs = require('fs');
let staticResourceExtns = ['.html', '.js', '.css', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resource){
	let extn = path.extname(resource);
	return staticResourceExtns.indexOf(extn) > -1;
}

module.exports = function(req, res, next){
	let resourceName = req.urlObj.pathname === '/' ? '/index.html' : req.urlObj.pathname,
		resource = path.join(__dirname, resourceName);
	if (isStatic(resource) && fs.existsSync(resource)){
		var stream = fs.createReadStream(resource).pipe(res);
		stream.on('end', function(){
			next();
		});
	} else {
		next();
	}
}
















