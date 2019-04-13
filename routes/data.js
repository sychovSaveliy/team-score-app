const fs = require('fs');

const {pathConcat, filereader} = require('./fsService');

function mainReq(req, res) {
	let path = pathConcat(`api${req.url}/${req.method.toLowerCase()}.json`);

	console.log(path);
	let servicePromise = filereader(fs, path)
	.then((response) =>{
		// console.log(response);
		res.json(response);
	})
}

function getAllTeams(req, res) {
	let path = pathConcat(`api${req.url}/${req.method.toLowerCase()}.json`);

/*	console.log(path);
	let servicePromise = filereader(fs, path)
	.then((response) =>{
		// console.log(response);
		res.json(response);
	})*/
}

module.exports = { mainReq, getAllTeams };