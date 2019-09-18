const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../db/user.js');
const { existy, truthy, fail, warn, note } = require('../custom_modules/js/varfunc.js');
const session = require('client-sessions');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
	res.redirect('./login');
});

router.get('/login', (req, res) => {
	res.render('login');
});

router.get('/signup', (req, res) => {
	res.render('signup');
});

router.get('/logout', (req, res, next) => {
	req.session.reset();
	res.redirect('./login');
});

router.post('/login', (req, res) => {
	User
	.getOneByEmail(req.body.email)
	.then(user => {
		// if invalid details
		if (!user.rows[0] || !bcrypt.compareSync(req.body.password, user.rows[0].password)) {
			return res.render('./login', { error: "Details do not match."});
		}

		// if valid details
		note('logged in succesfully');
		req.session.userId = user.rows[0].id;
		res.redirect('/dashboard');
	})
});

router.post('/signup', (req, res, next) => {
	let hash = bcrypt.hashSync(req.body.password, 14);
	req.body.password = hash;

	// check for existing user with e-mail
	if (validDetails(req.body)) {
		note('Details valid.')
		User
		.getOneByEmail(req.body.email)
		.then(user => {
			// if no existing user w that email
			if (!user.rows[0]) {
				note('Creating new user');
				User
				.createUser(req.body.email, req.body.password)
				.then(user => {
					return res.redirect('/dashboard');
				});
			} else {
				// email already in use
				warn('User already exists withs that email')
				res.redirect('./signup');
			}
		});
	} else {
		// fail and redirect
		warn('Invalid sign up details')
		res.redirect('./signup');
	}
});

function validDetails(user) {
	const validEmail = typeof user.email == 'string' && user.email.trim() != '';
	const validPassword = typeof user.password == 'string' && user.password.trim() != '';
	return validPassword && validEmail;
}

module.exports = router;