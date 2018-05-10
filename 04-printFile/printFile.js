const fs = require('fs');

//sync
//let fileContents = fs.readFileSync('./data.txt', { encoding :'utf8'});


//async (callback)
/*
fs.readFile('./data.txt', { encoding :  'utf8'}, function(err, fileContents){
	if (err){
		console.log('something went wrong');
		return;
	}
	console.log(fileContents);
});
*/

//Async (events)
let stream = fs.createReadStream('./data.txt', { encoding : 'utf8'});

//events -> open, data, end, close, error
 /*
let readCount = 0;
stream.on('data', function(chunk){
	console.log(chunk);
	++readCount;
});

stream.on('end', function(){
	console.log('====================== Thats all folks! ========================= ');
	console.log(` readCount = ${readCount}`);
});

stream.on('error', function(err){
	console.log('something went wrong', err);
});
*/

stream.pipe(process.stdout);

let readCount = 0;
stream.on('data', function(chunk){
	++readCount;
});

stream.on('end', function(){
	console.log('====================== Thats all folks! ========================= ');
	console.log(` readCount = ${readCount}`);
});













