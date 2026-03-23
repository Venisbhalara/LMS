const mysql = require("mysql2");
require("dotenv").config();

// Create a connection pool
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Enable SSL if required (e.g., for Aiven databases)
if (process.env.DB_SSL === "true") {
  dbConfig.ssl = {
    rejectUnauthorized: false
  };
}

const pool = mysql.createPool(dbConfig);

// Get promise-based version
const promisePool = pool.promise();

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err.message);
    return;
  }
  console.log("✓ MySQL database connected successfully");
  connection.release();
});

module.exports = promisePool;
