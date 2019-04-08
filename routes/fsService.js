const path = '.';

function pathConcat(pathname) {
	return path + '/' + pathname;
}

function filereader(fsRef, path) {
	return new Promise(function (resolve, reject) {
		fsRef.readFile(path, 'utf8', function (e, d) {
			if (e) reject(e);
			
			else resolve(JSON.parse(d));
		});
	});
}

module.exports = {
    pathConcat,
    filereader
}