var express = require('express'),
	router = express.Router();
	Topic = require('../models/forum.js');

router.get('/', function (req, res) {
	res.render('forumcomments/fCommentWelcome'); 
});

// router.use('/forumcomments', function (req, res) {
// 	res.render('forumcomments/fcomments'); 
// });

router.get('/:id/fcomments', function (req, res) {
	Topic.findOne({
		_id: req.params.id
	}, function (err, foundTopic) {
		if (err) {
			console.log("We found err");
		} else { 
			res.render('forumcomments/fcomments', { 
			topicInfos: foundTopic
			});
		};
	});
});

router.post('/', function (req, res) {
	console.log(req.body);
	Topic.findById({ _id: req.body.topicId }, function (err, topic) {
		var commentObj = {content:req.body.comment, user:req.session.currentUser}
		topic.comment.push(commentObj);
		topic.vote.push(req.body.vote);
		topic.save(function (err, topic) {
			if (err) {
				console.log(err)
			} else {
				res.redirect(301, '/forums/findex');
			}
		})
	})

});


module.exports = router;
