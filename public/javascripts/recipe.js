console.log("Loaded Javascripts/recipe.js");

function incrementServe(recipe) {
	changeQuantity(recipe, 1);
}

function decrementServe(recipe) {
	var tempRecipe = JSON.parse(recipe);
	var check = parseFloat(document.getElementsByClassName("recipe-serves" + tempRecipe.name)[0].innerHTML);
	if (check > 1) {
		changeQuantity(recipe, 0);
	}
}

function changeQuantity(original, shouldIncrement) {
	var recipe = JSON.parse(original); // parse into object

	// change displayed recipe serves
	var serveElement = document.getElementsByClassName("recipe-serves" + recipe.name);
	var newServes = parseFloat(serveElement[0].innerHTML);

	serveElement[0].innerHTML = (shouldIncrement) ? String(newServes + 1) + " " : String(newServes - 1) + " ";

	// change ingredient quantities
	var element = document.getElementsByClassName("ingredient-quantity " + recipe.name); // get quantity divs for recipe ingredients

	for (var i = 0; i < element.length; i++) {
		var newInt = parseFloat(element[i].innerHTML, 10) // parse current quantity into float
		var increment = recipe.ingredients[i].increment; // get amount to change by

		newInt = (shouldIncrement) ? newInt += increment: newInt -= increment; // increment or decrement based on shouldIncrement

		element[i].innerHTML = String(newInt); // update divs
	}
}

// Open photoswipe when clicking on individual images
function openPhotoswipe(recipe, i) {

	console.log(recipe.images)

	// Init photoswipe
	var pswpElement = document.querySelectorAll('.pswp')[0];
	var items = [];

	recipe.images.forEach((url, index) => {
		console.log(url);
		let image = {};
		image.src = url;
		image.w = 800;
		image.h = 600;
		items.push(image);
	});

	// define options (if needed)
	var options = {
	    // optionName: 'option value'
	    // for example:
	    index: i // start at first slide
	};

	// // Initializes and opens PhotoSwipe
	var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
	gallery.init();
}