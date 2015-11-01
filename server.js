var http = require('http'); //module shipped with Node

http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write('Hello World, How are you doing?>');
	res.end();
}).listen(3000);