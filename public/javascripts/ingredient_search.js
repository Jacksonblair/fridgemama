var ingredients = [
  { name: 'Beef' },
  { name: 'Bread' },
  { name: 'Lettuce' },
  { name: 'Eggs' }
];

$('.ui.search')
	.search({
		source: ingredients
	})
	console.log("searching");
;