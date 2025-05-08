const dotenv = require("dotenv");
const mysql = require("mysql2");
dotenv.config();

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "310146";
const DB_PORT = process.env.DB_PORT || "3306";
const DB_NAME = process.env.DB_NAME || "My_SQL";

console.log(`Connecting to DB: ${DB_USER}@${DB_HOST}:${DB_PORT} `);


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
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log(
    "Successfully connected to database with connection id " +
      connection.threadId
  );
  connection.release();
});

module.exports = pool;
