var http = require('http');

function requestListener (request, response) {
	console.log('Incoming request: (' + request.method + ') ' + request.url);
	response.writeHead(200, {
		'Content-Type': 'application/json'
	});
	response.end(JSON.stringify({error: null}) + '\n');
}

var server = http.createServer(requestListener);
server.listen(8080);