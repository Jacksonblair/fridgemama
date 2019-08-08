window.onload = function() {

	var content = [
	  { name: 'Beef' },
	  { name: 'Bread' },
	  { name: 'Lettuce' },
	  { name: 'Eggs' }
	];

	$('.ui.search')
	.search({
        type: 'standard',
		source: content,
	    searchFields: [
	      'name'
	    ]
	});

}

