// connect to database & init Sequelize obj
const { Client } = require('pg');
const Sequelize = require('sequelize');

var db = {}; // export obj

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres'
});

db.client = client;
db.sequelize = sequelize;

module.exports = db;
