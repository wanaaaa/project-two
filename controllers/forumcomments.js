var express = require('express'),
	router = express.Router();
	Topic = require('../models/forum.js');

router.get('/', function (req, res) {
	res.render('forumcomments/fCommentWelcome'); 
});

router.use('/fnew', function (req, res) {
	res.render('forumcomments/fnew'); 
});

router.post('/', function (req, res) {
	var newTopic = new Topic(req.body.topic);
	console.log(req.body.topic);

	newTopic.save(function (err, topicObject) {
		if (err) {
			console.log(err);
		} else {
			console.log(topicObject);
			console.log("save");
		}
	})
});


module.exports = router;
