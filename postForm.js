var http = require('http'),
		querystring = require('querystring');

function requestListener (request, response) {
	var formData = '';

	request.on('readable', function () {
		var data = request.read();

		if (typeof data === 'string') {
			formData += data;
		}
		else if (typeof data === 'object' && data instanceof Buffer) {
			formData += data.toString('utf8');
		}
	});

	request.on('end', function () {
		var output = '';

		if (!formData) {
			output = 'No form data\n';
		}
		else {
			var obj = querystring.parse(formData); //converts query to json

			if (!obj) {
				output = 'Form data didn\'t parse\n';
			}
			else {
				output = 'Form data: ' + JSON.stringify(obj) + '\n';
			}
		}

		response.end(output);
	});
}

var server = http.createServer(requestListener);
server.listen(8080);

//curl -i -X POST -d 'field1=aaa&field2=123' localhost:8080