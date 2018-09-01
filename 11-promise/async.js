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


/*
usage : 

var p = addAsyncPromise(100,200);

p.then(function(result){
	console.log(`[@Client] result = ${result}`);
});

//follow up operation is an async operation
var p2 = p.then(function(result){
	console.log(`[@Client] result = ${result}`);
	return new Promise(function(resolveFn, rejectFn){
		setTimeout(function(){
			var doubleResult = result * 2;
			resolveFn(doubleResult);
    	},3000);
	});
});

//follow up operation is a sync operation
var p2 = p.then(function(result){
	console.log(`[@Client] result = ${result}`);
	return new Promise(function(resolveFn, rejectFn){
		var doubleResult = result * 2;
		resolveFn(doubleResult);
	});
});

var p2 = p.then(function(result){
	console.log(`[@Client] result = ${result}`);
	return Promise.resolve(result * 2);
});

var p2 = p.then(function(result){
	console.log(`[@Client] result = ${result}`);
	return result * 2;
});


*/









