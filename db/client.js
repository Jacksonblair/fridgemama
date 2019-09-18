// connect to database & init Sequelize obj

const { Client } = require('pg');

// new pool
const `client` = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

module.exports = client;