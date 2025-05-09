const mysql = require("mysql2");
// Fix the import path - go up one directory level
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require('../config/config.js');

console.log(`Connecting to DB: ${DB_USER}@${DB_HOST}:${DB_NAME}}`);

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Error : Database connection failed:", err.stack);
    return;
  }
  console.log(
    "✅Successfully connected to database with connection id " +
      connection.threadId
  );
  connection.release();
});

module.exports = pool;