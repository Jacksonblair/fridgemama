var db = require('./connection.js');

module.exports = {
	getOneById: function(id) {
		return db.query('SELECT * FROM users WHERE id = $1', [id]);
	},
	getOneByEmail: function(email) {
		return db.query('SELECT * FROM users WHERE email = $1', [email]);
	},
	createUser: function(email, password) {
		return db.query('INSERT INTO users(email, password) VALUES ($1, $2)', [email, password]);
	}
}