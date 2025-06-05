const path = require('path');
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "Error",
  DATABASE: process.env.DATABASE || "Error",
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS || ""),
};