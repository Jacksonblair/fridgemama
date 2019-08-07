var express = require('express');
var router = express.Router();
const models = require('../custom_modules/models/index');
const client = require('../custom_modules/js/client');

/* GET home page. */
router.get('/', function(req, res, next) {
	getRecipes();
	res.render('index', { title: 'Fridgemama' });
});

router.get('/results', function(req, res, next) {
	res.render('results', {  });
});

async function getRecipes(ingredients) {

	console.log("Starting getRecipes()");

	// CREATE TEMPORARY TABLE, call immediately.
	(function createTemporaryTable() {
		var text = 'CREATE TEMPORARY TABLE ingredients_needed(name text);'
		// promise
		db.client
		.query(text)
		.then(res => {
			insertToTemporaryTable()
		})
		.catch(e => console.error(e.stack))
	})();

	function insertToTemporaryTable() {
		var text = 'INSERT INTO ingredients_needed(name)'
		var values = [];
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


module.exports = router;
