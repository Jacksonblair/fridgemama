var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var sessions = require('client-sessions'); 
const User = require('./db/user');

// require routes
var indexRouter = require('./routes/index.js');
var authRouter = require('./routes/auth.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Cache-control
	// TO-DO

// sessions
app.use(sessions({
	cookieName: "session",
	secret: process.env.SECRET,
	duration: 30 * 60 * 1000, // 30 mins
	httpOnly: true, 	// dont let js code access cookies
	secure: true 		// only set cookie is using https
}));

// smart user middleware
app.use((req, res, next) => {
	if (!(req.session && req.session.userId))
		return next();

	User
	.getOneById(req.session.userId)
	.then(user => {
		if (!user.rows[0])
			return next();

		// clear hashed password
		user.rows[0].password = undefined;

		req.user = user.rows[0];
		res.locals.user = user.rows[0];
		console.log(res.locals.user);


		next();
	})
	.catch(err => {
		return next(err);
	})
});

// mount routes
app.use('/', indexRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

module.exports = app;

// Render frontend

/*var express = require('express'),
	app     = express(),
	router  = express.Router(),
	pug     = require('pug'),
	fs      = require('fs');

function renderFrontend() {
	// Re-render the static viewer html
	// pug.renderFile renders a pug file to HTML.
	let viewerRender = pug.renderFile('views/index.pug');
	fs.writeFileSync('frontend/index.html', viewerRender);    
}

*/