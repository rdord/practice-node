var http = require('http'),
		fs = require('fs');

function listDirs (callback) {
	var rootDir = 'albums/';

	fs.readdir(rootDir, function(err, files){
		var dirsOnly = [];

		if (err) {
			callback(err);
			return;
		}
	
		(function iterator(i) {	//using recursion for async looping
			if (i >= files.length) {
				callback(null, dirsOnly);
				return;
			}

			fs.stat(rootDir + files[i], function(err, stats){
				if (err) {
					callback(err);
					return;
				}

				if (stats.isDirectory()) {
					dirsOnly.push(files[i]);
				}

				iterator(i+1);							
			});
		})(0);

	});
}

function requestListener (request, response) {
	console.log('Incoming request: (' + request.method + ') ' + request.url);

	listDirs(function (err, files) {
		if (err) {
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
