var express = require('express'),
	router = express.Router();
	Topic = require('../models/forum.js');

router.get('/', function (req, res) {
	res.render('forums/fwelcome'); 
});

router.get('/fnew', function (req, res) {
	res.render('forums/fnew'); 
});

router.post('/', function (req, res) {
	console.log(req.body);
	Topic.findById({ _id: req.body.topicId }, function (err, topic) {
		topic.comment.push(req.body.comment);
		topic.save(function (err, topic) {
			if (err) {
				console.log(err)
			} else {
				res.redirect(301, '/forums/findex');
			}
		})
	})

	// var newTopic = new Topic(req.body.topic);

	// newTopic.save(function (err, topicObject) {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		console.log(topicObject);
	// 		res.redirect('301', '/forums/findex')
	// 	}
	// })
});

router.post('/ffnew', function (req, res) {
	var newTopic = new Topic(req.body.topic);
	console.log(req.body.topic);

	newTopic.save(function (err, topicObject) {
		if (err) {
			console.log(err);
		} else {
			console.log(topicObject);
			res.redirect('301', '/forums/findex')
		}
	})
});



router.get('/findex', function (req, res) {
	Topic.find({}, function (err, topicContent) {
		if (err) {
			console.log(err);
		} else {			
			res.render('forums/findex', {topicObjects: topicContent});
		};
	});
});

router.get('/:id/fedit', function (req, res) {
	Topic.findOne({
		_id: req.params.id
	}, function (err, foundTopic) {
		if (err) {
			console.log('Bad user');
			res.end();
		} else {
			res.render('forums/fedit', { 
				topicInfos: foundTopic
			});
			console.log(foundTopic)
		};
	});	
});

router.patch('/:id', function (req, res) {
	console.log(req.params);
	Topic.findOne({
		_id: req.params.id
	}, function (err, foundTopic) {
		if (err) {
			console.log('Bad topic');
		} else {
			foundUser.update(req.params, function (errTwo, ttopic) {
				if (errTwo) {
					console.log("error update");
				} else {
					console.log("update");
					res.redirect(302, '/forums/findex');
				};
			});
		};
	});	
});

router.delete('/:id', function (req, res) {
	console.log(req.params.id);
	Topic.remove({
		_id: req.params.id
	}, function (err) {
		if (err) {
			console.log("Delete topic err")
		} else {
			res.redirect(302, '/forums/findex');
		};
	});
});

router.get('/:id/fcomments', function (req, res) {
	Topic.findOne({
		_id: req.params.id
	}, function (err, foundTopic) {
		if (err) {
			console.log("We found err");
		} else { 
			res.render('forums/fcomments', { 
			topicInfos: foundTopic
			});
		};
	});
});

module.exports = router;

