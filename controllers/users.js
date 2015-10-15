var express = require('express'),
	router = express.Router(),
	User = require('../models/user.js');

router.get('/new', function (req, res) {
	res.render('users/new');
	// res.render('posts/``new'); 
});

router.get('/login', function (req, res) {
	res.render('users/login');
});



router.post('/login', function (req, res) {
	var currentUser = req.body.user;

	console.log(req.session);

	User.findOne({username: currentUser.username}, function (err, foundUser) {
		if (foundUser && foundUser.password === currentUser.password) {
			req.session.currentUser = foundUser.username;
			console.log(req.session.currentUser);
			res.redirect(301, "/forums/findex");
		} else {
			res.redirect(301, '/users/new');
		}
	})
});

router.get('/index', function (req, res) {
	User.find({}, function (err, userContent) {
		if (err) {
			console.log(err);
		} else {			
			res.render('users/index', {userObjects: userContent});
		};
	});
});

router.post('/', function (req, res) {
	var newUser = new User(req.body.user);

	newUser.save(function (err, userObject) {
		if (err) {
			console.log(err);
		} else {
			console.log(userObject);
			res.redirect(301, '/login');
		}
	})
});

router.get('/:id/edit', function (req, res) {
	User.findOne({
		_id: req.params.id
	}, function (err, foundUser) {
		if (err) {
			console.log('Bad user');
			res.end();
		} else {
			res.render('users/edit', { 
				userInfos: foundUser
			});
			console.log(foundUser)
		};
	});	
});

router.patch('/:id', function (req, res) {
	console.log(req.params);
	User.findOne({
		_id: req.params.id
	}, function (err, foundUser) {
		if (err) {
			console.log('Bad user');
		} else {
			foundUser.update(req.body.id, function (errTwo, uuser) {
				if (errTwo) {
					console.log("error update");
				} else {
					console.log("update");
					res.redirect(302, '/users/index');
				};
			});
		};
	});	
});

router.delete('/:id', function (req, res) {
	console.log(req.params.id);
	User.remove({
		_id: req.params.id
	}, function (err) {
		if (err) {
			console.log("Delete user err")
		} else {
			res.redirect(302, '/users/index');
		};
	});
});

module.exports = router;