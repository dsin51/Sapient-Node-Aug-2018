var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

console.log("# of cpus -> ", numCPUs);

if (cluster.isMaster) {
  console.log(`master process - ${process.pid}`)
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  console.log(`slave process - ${process.pid}`)
  http.createServer(function(req, res) {
    console.log(`request served from - ${process.pid}`)
    res.writeHead(200);
    res.end("hello world\n");
  }).listen(8000);
}
