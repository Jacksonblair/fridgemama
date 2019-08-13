var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
// const models = require('../custom_modules/models/index');
// const client = require('../custom_modules/js/client');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Fridgemama' });
});

router.post('/results', async (req, res, next) => {
  try {
	var results = await getStuff(req.body.tags)
	res.render('index', { index: 'Fridgemama', results: results });
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e) 
  }
})



async function getRecipes(terms) {
	console.log("Starting getRecipes()");

	var response;
	var ingredientsText = "";
	var searchTerms = terms.split(',');

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
		text: 'SELECT recipes.name'
			+ ' FROM recipes'
			+ ' INNER JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id'
			+ ' INNER JOIN ingredients ON ingredients.id = recipe_ingredients.ingredient_id'
			+ ' RIGHT JOIN ingredients_needed ON ingredients_needed.name = ingredients.name'
			+ ' GROUP BY recipes.name'
			+ ' HAVING COUNT(*) <= (SELECT COUNT(*) FROM ingredients_needed);'
	}
}

	// CREATE TEMPORARY TABLE, call immediately.
	function createTemporaryTable() {
		// promise
		client
		.query(query1)
		.then(res => {
			console.log("Added temporary table");
			insertToTemporaryTable()
		})
		.catch(e => console.error(e.stack))
	};

	function insertToTemporaryTable() {
		client
		.query(query2)
		.then(res => {
			console.log("Added ingredients_needed");
			searchForRecipes();
		})
		.catch(e => console.error(e.stack))
	}

	function searchForRecipes() {
		client
		.query(query3)
		.then(res => {
			console.log("Checking for recipes");
			console.log(res);
			response = res;
			return response;
		})
		.catch(e => console.error(e.stack))
	}

module.exports = router;
