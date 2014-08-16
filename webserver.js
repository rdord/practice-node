var http = require('http');

var server = http.createServer(function (request, response) {
	response.end('returned text');
});

server.listen(8080);

