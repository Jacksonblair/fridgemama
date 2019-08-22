$('.ui.accordion')
  .accordion()
;

function incrementServe(recipe) {
	changeQuantity(recipe, 1);
}

function decrementServe(recipe) {
	var tempRecipe = JSON.parse(recipe);
	var check = parseFloat(document.getElementsByClassName("recipeserves" + tempRecipe.name)[0].innerHTML);
	if (check > 1) {
		changeQuantity(recipe, 0);
	}
}


function changeQuantity(original, shouldIncrement) {
	var recipe = JSON.parse(original); // parse into object

	// change displayed recipe serves
	var serveElement = document.getElementsByClassName("recipeserves" + recipe.name);
	var newServes = parseFloat(serveElement[0].innerHTML);

	serveElement[0].innerHTML = (shouldIncrement) ? String(newServes + 1) + " " : String(newServes - 1) + " ";

	// change ingredient quantities
	var element = document.getElementsByClassName("ingredientquantity" + recipe.name); // get quantity divs for recipe ingredients

	for (var i = 0; i < element.length; i++) {
		var newInt = parseFloat(element[i].innerHTML, 10) // parse current quantity into float
		var increment = recipe.ingredients[i].increment; // get amount to change by

		newInt = (shouldIncrement) ? newInt += increment: newInt -= increment; // increment or decrement based on shouldIncrement

		element[i].innerHTML = String(newInt); // update divs
	}
}