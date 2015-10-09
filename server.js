var express = require('express'),
	PORT = process.env.PORT || 5432;
	server = express();
	MONGOURI = process.env.MONGOLAB_URI,
	dbname = "pease_change_this",
	mongoose = require('mongoose');

server.get('/', function (req, res) {
	res.write("Welcome to my amaizng app");
	res.end();
});

server.listen(PORT, function () {
	console.log("Server.")
})