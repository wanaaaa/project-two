var express = require('express'),
	router = express.Router();
	Topic = require('../models/forum.js');

router.get('/fwelcome', function (req, res) {
	res.render('forums/fwelcome'); 
});

router.get('/fnew', function (req, res) {
	res.render('forums/fnew'); 
});

router.post('/', function (req, res) {
	var newTopic = new Topic(req.body.topic);
	console.log(req.body.topic);
	console.log("I am saving 01");
	console.log(req.session);
	newTopic.author = req.session.currentUser;
	newTopic.save(function (err, topicObject) {
		if (err) {
			console.log(err);
		} else {
			console.log(topicObject);
			console.log("I am saving 02");
			res.redirect(301, '/forums/findex')
		}
	})
});



router.get('/findex', function (req, res) {

	console.log(req.session.currentUser, "findex");

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
	console.log(req.params.topic, "params.topic");
	console.log("patch incomming");

	Topic.findOne({
		_id: req.params.id
	}, function (err, foundTopic) {
		if (err) {
			console.log('Bad topic');
		} else {
			foundTopic.update(req.body.topic, function (errTwo, topic) {
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

// router.patch('/:id', function (req, res) {
// 	console.log(req.body, "I am body");
// 	console.log(req.params, "I am parmas");

//   Topic.update({_id : req.params.id
//   	}, req.body.topic, function (err, result) {
//     if(err) {
//       console.log(err);
//     } else {
//       res.redirect(301, '/forums/findex');
//     };
//   });
// });

router.delete('/:id', function (req, res) {
	console.log(req.params.id);
	console.log("I am deleting");
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

router.get('/topicranking', function (req, res) {
	console.log("topicranking");
	Topic.find({}, function (err, topicContent) {
		if (err) {
			console.log(err);
		} else {			
			res.render('forums/topicranking', {topicObjects: topicContent});
		};
	});
})

// router.get('/popular', function (req, res, next) {
// 	Post.find().sort({votes: -1}).limit(12).exec(function (err, thePosts) {
// 		if(err){
// 			console.log(err);
// 			res.render('posts/popular');
// 		}else{
// 			res.render('posts/popular', {
// 			post: thePosts
// 			});
// 		}
// 	});
// });

module.exports = router;

