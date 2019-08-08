var ingredients = [
	{name: 'Beef', value: 'Beef'},
	{name: 'Eggs', value: 'Eggs'}
]

$('.ui.dropdown')
  .dropdown({
    values: [
      {
        name: 'Male',
        value: 'male'
      },
      {
        name     : 'Female',
        value    : 'female'
      }
    ]
  });