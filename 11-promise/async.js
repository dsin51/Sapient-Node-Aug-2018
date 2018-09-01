function addAsync(x,y, callback){
	console.log(`	[@Service] processing ${x} and ${y}`);
	setTimeout(function(){
		let result = x + y;
		console.log(`	[@Service] returning result`);
		callback(result);
	}, 3000);
}

function addAsyncClient(x,y){
	console.log('[@Client] triggering addAsync');
	addAsync(x,y, function(result){
		console.log(`[@Client] result = ${result}`);
	})
}

module.exports.addAsyncClient = addAsyncClient;

function addAsyncPromise(x,y){
	console.log(`	[@Service] processing ${x} and ${y}`);
	let p = new Promise(function(resolveFn, rejectFn){
		setTimeout(function(){
			let result = x + y;
			console.log(`	[@Service] returning result`);
			resolveFn(result);
		}, 3000);
	});
	return p;
}

module.exports.addAsyncPromise = addAsyncPromise;












