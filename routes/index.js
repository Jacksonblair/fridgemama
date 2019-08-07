var express = require('express');
var router = express.Router();
const models = require('../custom_modules/models/index');
const client = require('../custom_modules/js/client');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Fridgemama' });
});

router.get('/results', function(req, res, next) {
	res.render('results', {  });
});

async function getRecipes() {
	console.log("Starting getRecipes()");

	var query1 = {
		text: 'CREATE TEMPORARY TABLE ingredients_needed(name text);'
	}

	var query2 = {
		text: 'INSERT INTO ingredients_needed(name) VALUES($1),($2)',
		values: ['Bread', 'Beef']
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
	}

	function insertToTemporaryTable() {
		client
		.query(query2)
		.then(res => {
			console.log("Added ingredients_needed");
			client
			.query('SELECT * FROM ingredients_needed;')
			.then(res => {
				console.log(res);
			}).catch(e => console.error(e.stack))
		})
		.catch(e => console.error(e.stack))
	}

	createTemporaryTable();
}

getRecipes();

module.exports = router;
