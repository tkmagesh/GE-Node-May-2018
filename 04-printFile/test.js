function addSync(x,y){
	if(typeof x !== 'number' || typeof y !== 'number')
		throw new Error('Invalid arguments');
	return x + y;
}
function addAsync(x,y, callback){
	setTimeout(function(){
		if(typeof x !== 'number' || typeof y !== 'number'){
			var err = new Error('Invalid arguments');
			return callback(err, null);
		}
		let result = x + y;
		callback(null, result);
	}, 5000);
}
module.exports = {
	addSyncClient(x,y){
		try{
			var result = addSync(x,y);
			return result;
		}
		catch(e){
			console.log('something went wrong');
		}
	},
	addAsyncClient(x,y){
		addAsync(x,y, function(err, result){
			if (err){
				console.log('something went wrong');
				return;		
			}
			console.log(`result = ${result}`);
		});
		
	}
}