var express = require('express');
var router = express.Router();
const models = require('../custom_modules/models/index');
const db = require('../custom_modules/js/db.js')

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Fridgemama' });
});

/* GET results page. */
router.get('/results', function(req, res, next) {
	res.render('results', {  });
});


async function getRecipes(ingredients) {

	// CREATE TEMPORARY TABLE
	function createTemporaryTable() {
		var text = 'CREATE TEMPORARY TABLE ingredients_needed(name text);'
		// promise
		db.client
		.query(text)
		.then(res => {
			insertToTemporaryTable()
		})
		.catch(e => console.error(e.stack))
	}

	function insertToTemporaryTable() {
		var text = 'INSERT INTO ingredients_needed(name)'
		var values = ['Beef', 'Bread'];
		// for ea. search term in ingredients array, add row to ingredients_needed
		ingredients.forEach((ingredient) => {
			values.push(ingredient);
		});
		db.client
		.query(text, values)
		.then(res => {
			console.log(res.rows);	
		})
		.catch(e => console.erorr(e.stack))
	}
}

getRecipes();

/*
CREATE TEMPORARY TABLE ingredients_needed(name text);
INSERT INTO ingredients_needed(name) VALUES ('Bread');

SELECT recipes.name
FROM recipes
INNER JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id
INNER JOIN ingredients ON ingredients.id = recipe_ingredients.ingredient_id
LEFT JOIN ingredients_needed ON ingredients_needed.name = ingredients.name
GROUP BY recipes.name
HAVING COUNT(*) = (SELECT COUNT(*) FROM ingredients_needed);
*/

function createRecipe(name, desc, method) {
	models.Recipe.create({
	    name: name,
	    description: desc,
	    method: method
	}).then(() => {
	    console.log("Recipe created.");
	});
}

function createIngredient(name) {
	models.Ingredient.create({
	    name: name
	}).then(() => {
	    console.log("Ingredient created.");
	});
}

function createRecipe_Ingredient(name) {
	models.Recipe_Ingredient.create({
	    name: name
	}).then(() => {
	    console.log("Ingredient created.");
	});
}

module.exports = router;
