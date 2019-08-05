const Sequelize = require('sequelize');
const db = require('../js/db.js')
var Models = {};

// Recipe model
const Recipe = db.define('recipe', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true // Automatically gets converted to SERIAL for postgres
	},
	name: Sequelize.STRING,
	description: Sequelize.TEXT,
	method: Sequelize.TEXT
}, {
	timestamps: false
});

// Ingredient model
const Ingredient = db.define('ingredient', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true // Automatically gets converted to SERIAL for postgres
	},
	name: Sequelize.STRING
}, {
	timestamps: false
});

// Recipe_ingredient association table model
const Recipe_Ingredient = db.define('recipe_ingredient', {
	recipe_id: {
		type: Sequelize.INTEGER,
		references: { model: "recipe", key: "id" }
	},	
	ingredient_id: {
		type: Sequelize.INTEGER,
		references: { model: "ingredient", key: "id" }
	}
}, {
	timestamps: false
});

Models.Recipe = Recipe;
Models.Ingredient = Ingredient;
Models.Recipe_Ingredient = Recipe_Ingredient;

// Score.removeAttribute('id');

module.exports = Models;
