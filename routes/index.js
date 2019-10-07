var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
const session = require('client-sessions');
const User = require('../db/user.js');
const Recipe = require('../db/recipe.js');

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

	// separate tags into array, so they can persist through multiple searches
  	res.locals.tags = req.body.tags.split(',');
  	res.locals.tagstring = req.body.tags;

	// var results = await queries.getRecipes(req.body.tags)
	res.render('results', { results: results });
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e) 
  }
});


router.get('/recipe/submit', isAdmin, async (req, res,next) => {
	res.render('submit');
});

router.get('/recipe/:id', async (req, res, next) => {
	console.log("RECIPE ID: " + req.params.id);
	// var recipe = Recipe.getOneById(req.params.id);
	res.render('recipe', { recipe: results[0] });
});

router.get('/favicon.ico', (req, res) => {
    res.sendStatus(404);
});

var results = [
		{
			name: "Burger", 
			description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
			method: "Cook me and don't burn me bitch.",
			id: 1,
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
				'/images/burger01.jpg',
				'/images/burger02.jpg',
				'/images/burger03.jpg',
				'/images/burger03.jpg'
			]
		},
		{
			name: "Spaghetti", 
			description: "A tasty burger that will fuck your tastebuds up good. This burger will make you believe in god. This burger will ruin other burgers for you. Guaranteed life changing meal.",
			method: "Cook me and don't burn me bitch.",
			id: 2,
			ingredients: [
				{ 
				name: "Spaghetti",
				quantity: 1,
				unit: "Handful",
				increment: 1
				},
				{ 
				name: "Beef Mince",
				quantity: 1.5,
				unit: "Cup",
				increment: 1.5
				},				
				{ 
				name: "Tomato Sauce",
				quantity: 2,
				unit: "Cups",
				increment: 2
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

function isAdmin(req, res, next) {

	if (!req.user || !req.user.isadmin) {
		return res.redirect('/');
	}
	
	next();
}

module.exports = router;
