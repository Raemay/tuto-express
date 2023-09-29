// gérer la connexion à la bdd avec le .env
require("dotenv").config();
const mysql = require("mysql2");
console.log(process.env.DB_HOST);
const database = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = database;
