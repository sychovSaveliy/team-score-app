const fs = require('fs');

const {
	pathConcat,
	filereader,
	actionExecutor
} = require('./fsService');

function teamAllReq(req, res) {
	let path = pathConcat(`dist/api${req.url}/${req.method.toLowerCase()}.json`);

	filereader(path)
		.then(response => {
			if (response && response.action) {
				return actionExecutor(response.action, req.url);
			}

			return response;
		})
		.then(arrayOfItems => {
			Promise
				.all(arrayOfItems)
				.then(values => {
					res.json(values);
				})
		})
}

function mainReq(req, res) {
	let path = pathConcat(`dist/api${req.url}/${req.method.toLowerCase()}.json`);

	console.log(path);
	let servicePromise = filereader(path)
		.then((response) => {
			// console.log(response);
			res.json(response);
		})
}

module.exports = {
	mainReq,
	teamAllReq
};