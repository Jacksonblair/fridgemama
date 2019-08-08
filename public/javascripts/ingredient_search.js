window.onload = function() {

	var ingredients = [
	  { name: 'Beef' },
	  { name: 'Bread' },
	  { name: 'Lettuce' },
	  { name: 'Eggs' }
	];

	$('.ui.search')
		.search({
            type: 'standard',
			source: ingredients,
		    searchFields: [
		      'name'
		    ]
		})
	;

}

