var http = require('http'),
		fs = require('fs');

function listDirs (callback) { //has the callback function as an argument
	var rootDir = 'albums/'; //set the dir of which the content will be listed

	fs.readdir(rootDir, function(err, files){  //reads the contents of a directory
		var dirsOnly = [];

		if (err) {
			callback(err);
			return;
		}
	
		(function iterator(i) {	//using recursion for async looping
			if (i >= files.length) { //when all files are checked
				callback(null, dirsOnly); //pass the array or dir names in the callback
				return;
			}

			fs.stat(rootDir + files[i], function(err, stats){ //stats of the current file
				if (err) {
					callback(err);
					return;
				}

				if (stats.isDirectory()) { //if current file is a dir
					dirsOnly.push(files[i]); //add to the array of dir names
				}

				iterator(i+1); //go to the next file							
			});
		})(0); //start with i=0

	});
}

function getAlbums(request, response) {
	listDirs(function (err, files) { //call function that lists dirs
		if (err) { //if it has an error
			response.writeHead(503, {
				'Content-Type': 'application/json'
			});
			response.end(JSON.stringify({ //return JSON with error msg
				error: 'file_error', 
				message: err.message
			}) + '\n');
		}

		response.writeHead(200, { 
			'Content-Type': 'application/json'
		});
		response.end(JSON.stringify({ //return JSON with list of dirs
			error: null,
			data: {
				albums: files
			}
		}) + '\n');
		
	});
}

function listFiles (albumName, callback) { //has the callback function as an argument
	var rootDir = 'albums/'; //set the dir of which the content will be listed

	fs.readdir(rootDir + albumName, function(err, files){  //reads the contents of a directory
		var filesOnly = [];

		if (err) {
			callback(err);
			return;
		}
	
		(function iterator(i) {	//using recursion for async looping
			if (i >= files.length) { //when all files are checked
				callback(null, filesOnly); //pass the array or dir names in the callback
				return;
			}

			fs.stat(rootDir + albumName + '/' + files[i], function(err, stats){ //stats of the current file
				if (err) {
					callback(err);
					return;
				}

				if (stats.isFile()) { //if current file is a file
					filesOnly.push(files[i]); //add to the array of file names
				}

				iterator(i+1); //go to the next file							
			});
		})(0); //start with i=0

	});
}

function getPictures(request, response) {
	var albumName = request.url.substr(8, request.url.length - 8 - 5); // /albums/[albumName].json

	listFiles(albumName, function (err, files) { //call function that lists files
		if (err) { //if it has an error
			response.writeHead(503, {
				'Content-Type': 'application/json'
			});
			response.end(JSON.stringify({ //return JSON with error msg
				error: 'file_error', 
				message: err.message
			}) + '\n');
		}

		response.writeHead(200, { 
			'Content-Type': 'application/json'
		});
		response.end(JSON.stringify({ //return JSON with list of dirs
			error: null,
			data: {
				album: { 
					name: albumName,
					photos: files
				}
			}
		}) + '\n');
		
	});
}

function requestListener (request, response) {
	console.log('Incoming request: (' + request.method + ') ' + request.url);

	if (request.url === '/albums.json') {
		getAlbums(request, response);
	} 
	else if (request.url.substr(0, 8) === '/albums/' && 
					 request.url.substr(request.url.length - 5) === '.json') { //if url starts with /albums/ and ends with .json
		getPictures(request, response); 																 //e.g., /albums/italy2012.json
	}	
	else {  //nonexistent url request
		response.writeHead(404, {
			'Content-Type': 'application/json'
		});
		response.end(JSON.stringify({
			error: 'req_error', 
			message: 'unknown url'
		}) + '\n');
	}
}

var server = http.createServer(requestListener);
server.listen(8080);

//localhost:8080/albums.json
//localhost:8080/albums/italy2012.json
