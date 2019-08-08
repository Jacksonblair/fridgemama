var ingredients = [
	{name: 'Beef', value: 'Beef'},
	{name: 'Eggs', value: 'Eggs'}
]

$('.ui.dropdown')
  .dropdown({
    values: ingredients
  });