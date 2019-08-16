var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
const models = require('../custom_modules/models/index');
const client = require('../custom_modules/js/client');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Fridgemama' });
});

router.get('/results', function(req, res, next) {
	res.redirect('/');
});

router.post('/results', async (req, res, next) => {
  try {
  	console.log(req.body.tags);
	var results = await getRecipes(req.body.tags)
	results = [{name: "Burger", method: "Cook me and don't burn me bitch."}, {name: "Souffle", method: "Read a recipe book im complicated af."}];
	res.render('results', { title: 'Fridgemama', results: results });
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e) 
  }
});

async function getRecipes(terms) {
	console.log("Starting getRecipes()");

	var response;
	var ingredientsText = "";
	var searchTerms = terms.split(',');
	var foundRecipes = [];

	searchTerms.forEach((term, i) => {
		ingredientsText += "($" + (i + 1) + ")";
		if (!(searchTerms.length === (i + 1))) 
			ingredientsText += ", ";
	})

	// temp table query
	var query1 = { text: 'CREATE TEMPORARY TABLE ingredients_needed(name text);' }

	// search terms query
	var query2 = {
		text: 'INSERT INTO ingredients_needed(name) VALUES' + ingredientsText,
		values: searchTerms
	}

	var query3 = {
		text: 'SELECT recipes.id, recipes.name, count(ingredients_needed.name) AS MATCHES, count(ingredients.name) AS REQUIRED, method,description'
			+ ' FROM recipes'
			+ ' INNER JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id'
			+ ' INNER JOIN ingredients ON ingredients.id = recipe_ingredients.ingredient_id'
			+ ' LEFT JOIN ingredients_needed ON ingredients_needed.name = ingredients.name'
			+ ' GROUP BY recipes.id'
			+ ' HAVING COUNT(ingredients.name) <= COUNT(ingredients_needed.name);'
	}

	var query4 = {
		text: 'SELECT name, unit, quantity, recipe_id'
		+ ' FROM ingredients'
		+ ' JOIN recipe_ingredients ON ingredients.id = recipe_ingredients.ingredient_id'
		+ ' WHERE recipe_id IN (1, 2);'
	}

	// CREATE TEMPORARY TABLE
	client
	.query(query1)
	.then(res => {
		console.log("Added temporary table");
		insertToTemporaryTable()
	})
	.catch(e => console.error(e.stack))

	// INSERT TO temporary table
	function insertToTemporaryTable() {
		client
		.query(query2)
		.then(res => {
			console.log("Added ingredients_needed");
			searchForRecipes();
		})
		.catch(e => console.error(e.stack))
	}

	// Search for recipes using temp table
	function searchForRecipes() {
		client
		.query(query3)
		.then(res => {
			console.log("Found recipes");
			res.rows.forEach((recipe) => {
				foundRecipes.push(recipe);
			});
			console.log(foundRecipes);
			getIngredientsForRecipes();
		})
		.catch(e => console.error(e.stack))
	}

	// Get ingredient details and append to 'foundRecipes'
	function getIngredientsForRecipes() {
		client
		.query(query4)
		.then(res => {
			console.log("Getting ingredients for recipes")
			res.rows.forEach((ingredient) => {
				// add ingredients to correct recipe, matched by recipe id
				for (var i = 0; i < foundRecipes.length; i++) {
					if (ingredient.recipe_id === foundRecipes.id) {
						foundRecipes[i].ingredients = [];
						foundRecipes[i].ingredients.push(ingredient);
						console.log(ingredient.recipe_id);
						console.log(foundRecipes.id);
					}
				}
			});
		});
	}

	return foundRecipes;
}



module.exports = router;
