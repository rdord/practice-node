var fs = require('fs');

function FileObject () {
	this.filename = null;

	this.doesExist = function (callback) {
		var that = this;

		fs.open(that.filename, 'r', function(err, fd){
			if (err) {
				console.log(that.filename + ' does not exist.');
				callback(false);
			}
			else {
				console.log(that.filename + ' does exist.');
				callback(true);
				fs.close(fd);
			}
		});
	};
}

var fo = new FileObject();
fo.filename = 'test.txt';

fo.doesExist(function (itExists) {
	console.log('file exists: ' + itExists);
});

