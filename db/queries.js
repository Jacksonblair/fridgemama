var queries = {};

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


	// Get all images that are associated with the id's of the recipes we have matched
	var queryRecipeImages = {
		text: 'SELECT url, recipe_id'
			+ 'FROM images'
			+ 'WHERE recipe_id IN  (' + ids + ');'
	}

	// CREATE TEMPORARY TABLE
	client.connect();

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
		var recipe_ids = ""; // hold string of ID's to pass to next query.
		client
		.query(query3)
		.then(res => {
			console.log("Found recipes");
			res.rows.forEach((recipe) => {
				foundRecipes.push(recipe);
				// check if is first id and doesnt need a preceding comma
				recipe_ids += (recipe_ids) ? ", " + String(recipe.id) : String(recipe.id);
			});
			console.log(foundRecipes);
			console.log(recipe_ids);
			getRecipeImages(recipe_ids);
			getIngredientsForRecipes(recipe_ids);
		})
		.catch(e => console.error(e.stack))
	}

	// Get images and comments for recipes
	function getImagesForRecipes(ids) {
		client
		.query(queryRecipeImages)
		.then(res => {
			console.log("Found images for recipes");
			res.rows.forEach((image) => {
				for (var i = 0; i < foundRecipes.length; i++) {
					foundRecipes[i].images = [];
					if (image.recipe_id === foundRecipes[i].id) {
						foundRecipes[i].images.push(image);
						console.log(image);
						console.log(foundRecipes[i]);
					}
				}
			})
		})
		.catch(e => console.error(e.stack))
	}

	// Get ingredient details and append to 'foundRecipes'
	function getIngredientsForRecipes(ids) {
		client
		.query( 'SELECT name, unit, quantity, recipe_id'
		+ ' FROM ingredients'
		+ ' JOIN recipe_ingredients ON ingredients.id = recipe_ingredients.ingredient_id'
		+ ' WHERE recipe_id IN (' + ids + ');')
		.then(res => {
			console.log("Getting ingredients for recipes")
			res.rows.forEach((ingredient) => {
				// add ingredients to correct recipe, matched by recipe id
				for (var i = 0; i < foundRecipes.length; i++) {
					foundRecipes[i].ingredients = [];
					if (ingredient.recipe_id === foundRecipes[i].id) {
						foundRecipes[i].ingredients.push(ingredient);
						console.log(ingredient);
						console.log(foundRecipes[i]);
					}
				}
			})
			client.end();
		});
		.catch(e => console.error(e.stack))
	}
	return foundRecipes;
}

queries.getRecipes = getRecipes;
module.exports = queries;