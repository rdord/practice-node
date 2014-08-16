var fs = require('fs');

fs.open('test.txt', 'r', function(err, fd){ //fd: file descriptor 
	if (err) throw err;
	var buf = new Buffer(100000);

	fs.read(fd, buf, 0, 100000, null, function (err, bytesRead, buf) {
		if (err) throw err;
		console.log(buf.toString('utf8', 0, bytesRead));
		fs.close(fd);
	});		
});