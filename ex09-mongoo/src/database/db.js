// database/db.js
const mongoose = require('mongoose');
const { DATABASE } = require('../config/config.js');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DATABASE);
    console.log(`[Database] Connected to MongoDB: ${conn.connection.name} ✅`);
  } catch (err) {
    console.error(`[Database] Connection error ❌`, err);
    process.exit(1);
  }
};

module.exports = connectDB;
