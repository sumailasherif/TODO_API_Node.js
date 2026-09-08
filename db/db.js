// Sets up a reusable MySQL connection pool using credentials from .env

require('dotenv').config();
const mysql = require('mysql2/promise');

// A pool manages multiple connections and reuses them,
// which is more efficient than opening a new connection per request
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exported so models can import it to run queries
module.exports = pool;