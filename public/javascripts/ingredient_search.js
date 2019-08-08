var content = [
  { name: 'Beef' },
  { name: 'Bread' },
  { name: 'Lettuce' },
  { name: 'Eggs' }
];

$('.ui.search')
	.search({
		source: content
	})
;