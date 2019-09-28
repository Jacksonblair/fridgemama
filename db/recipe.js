var db = require('./connection.js');

module.exports = {
	getOneById: function(id) {
		return db.query('SELECT * FROM recipes WHERE id = $1', [id]);
	}
}