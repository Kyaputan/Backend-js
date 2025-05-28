// configenv.js
const path = require('path');
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  DATABASE: process.env.DATABASE || "Error",
  bcrypt_salt_rounds: process.env.bcrypt_salt_rounds || 10,
};