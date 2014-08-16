var http = require('http'),
		fs = require('fs');

function listDirContent (callback) {
	fs.readdir('albums/', function(err, files){
		callback(err, files);
	});
}

function requestListener (request, response) {
	console.log('Incoming request: (' + request.method + ') ' + request.url);

	listDirContent(function (err, files) {
		if (err !== null) {
			response.writeHead(503, {
				'Content-Type': 'application/json'
			});
			response.end(JSON.stringify({
				error: 'file_error', 
				message: err.message
			}) + '\n');
		}

		response.writeHead(200, {
			'Content-Type': 'application/json'
		});
		response.end(JSON.stringify({
			error: null,
			data: {
				albums: files
			}
		}) + '\n');
		
	});
}


var server = http.createServer(requestListener);
server.listen(8080);
