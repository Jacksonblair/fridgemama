const pg = require('pg');

// Database
const pool = new pg.Pool({connectionString: process.env.DATABASE_URL});

pool.on('connect', client => {
	console.log('Connected to database');
})

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
});

module.exports = pool;