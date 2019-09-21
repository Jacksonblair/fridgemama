var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
const session = require('client-sessions');
const User = require('../db/user.js');

app.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Fridgemama' });
});

router.get('/dashboard', loginRequired, (req, res) => {
	res.json(req.user);
});

router.get('/results', function(req, res, next) {
	res.render('dashboard');
	res.redirect('/');
});

router.post('/results', async (req, res, next) => {
  try {
  	console.log(req.body.tags);
	// var results = await queries.getRecipes(req.body.tags)
	res.render('results', { results: results });
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e) 
  }
});

router.get('/favicon.ico', (req, res) => {
    res.sendStatus(404);
});

var results = [
		{
			name: "Burger", 
			description: "A tasty burger that will fuck your tastebuds up good. This burger will make you believe in god. This burger will ruin other burgers for you. Guaranteed life changing meal.",
			method: "Cook me and don't burn me bitch.",
			ingredients: [
				{ 
				name: "Bread",
				quantity: 2,
				unit: "Slice",
				increment: 2
				},
				{ 
				name: "Beef",
				quantity: 1.5,
				unit: "Cup",
				increment: 1.5
				},				
				{ 
				name: "Lettuce",
				quantity: 3,
				unit: "Leaf",
				increment: 3
				},
			],
			images: [
				'/images/image.png',
				'/images/image.png',
				'/images/image.png'
			]
		},
		{
			name: "Burger", 
			description: "A tasty burger that will fuck your tastebuds up good. This burger will make you believe in god. This burger will ruin other burgers for you. Guaranteed life changing meal.",
			method: "Cook me and don't burn me bitch.",
			ingredients: [
				{ 
				name: "Bread",
				quantity: 2,
				unit: "Slice",
				increment: 2
				},
				{ 
				name: "Beef",
				quantity: 1.5,
				unit: "Cup",
				increment: 1.5
				},				
				{ 
				name: "Lettuce",
				quantity: 3,
				unit: "Leaf",
				increment: 3
				},
			],
			images: [
				'/images/image.png',
				'/images/image.png',
				'/images/image.png'
			]
		}
	];

function loginRequired(req, res, next) {
	if (!req.user)
		return res.redirect('/auth/login');

	next();
}

module.exports = router;
