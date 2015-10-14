// var express = require('express'),
// 	PORT = process.env.PORT || 5432;
// 	server = express();
// 	MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
// 	dbname = "pease_change_this",
// 	mongoose = require('mongoose');

// server.get('/', function (req, res) {
// 	res.write("Welcome to my amaizng app");
// 	res.end();
// });

// server.listen(PORT, function () {
// 	console.log("Server.")
// })

var express = require('express'),
	server = express(),
	ejs = require('ejs'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	expressLayouts = require('express-ejs-layouts'),
	morgan = require('morgan'),
	mongoose = require('mongoose');
	session = require('express-session');

server.set('views', './views');
server.set('view engine', 'ejs');

server.use(session({
	secret: "Some passPharase to encript", 
	resave: true,
	saveUnintialized:  false
}));
 
server.use(morgan('short'));

server.use(express.static("./public"));

server.use(expressLayouts);
  
server.use(bodyParser.urlencoded({extended: true}));
server.use(methodOverride('_method'));

var userController = require('./controllers/users.js');
server.use('/users', userController);

var forumController = require('./controllers/forums.js');
server.use('/forums', forumController);

var forumCommentController = require('./controllers/forumcomments.js');
server.use('/forumcomments', forumCommentController);
 
server.use('/', function (req, res) {
	res.render('welcome');
});

//catch all routes, as a last resort
server.use(function (req, res, next) {
	res.send("Your journey ends here, Somthing Wrong");
	res.end();
});

// Database + server
mongoose.connect('mongodb://localhost:27017/my_forum');
var db = mongoose.connection;

db.on('error', function () {
	console.log("Database errors");
});

db.once('open', function () {
	console.log("Database up and running");
	server.listen(3000, function () {
		console.log("server up and running");
	})
})
