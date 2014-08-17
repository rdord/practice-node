var http = require('http');

function requestListener (request, response) {
	var jsonData = '';  //empty for adding data with += and not getting 'undefined' prefix

	request.on('readable', function () {
		var data = request.read();

		if (typeof data === 'string') {
			jsonData += data;
		}
		else if (typeof data === 'object' && data instanceof Buffer) {
			jsonData += data.toString('utf8');
		}
	});

	request.on('end', function () {
		var output = '';

		if (!jsonData) {
			output = 'No JSON\n';
		}
		else {
			var json = '';

			try {
				json = JSON.parse(jsonData);
			} catch(e) {}

			if (!json) {
				output = 'Invalid JSON\n';
			}
			else {
				output = 'Valid JSON: ' + jsonData + '\n';
			}
		}

		response.end(output);
	});
}

var server = http.createServer(requestListener);
server.listen(8080);

//curl -i -X POST -H 'Content-Type: application/json' -d '{ "field1":"aaa", "field2":123 }' localhost:8080