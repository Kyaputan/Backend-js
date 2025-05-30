const pool = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config/config.js');

const loginHandler = (req, res) => {
    const { Email, Password } = req.body;
    const query = "SELECT * FROM users WHERE email = ?";
    if (!Email || !Password) {
        return res.status(400).json({
            message: "Email and password are required",
        });
    }
    if (Email == Password) {
        return res.status(400).json({
            message: "Email and password cannot be the same",
        });
    }

    pool.query(query, [Email], (error, results) => {
        if (error) {
          console.error("❌ Error executing query:", error);
          return res.status(500).json({error: "Database query failed"});
        }
    
        if (results.length === 0) {
          return res.status(401).json({message: "User not found"});
        }

    const user = results[0];
    // ตรวจสอบว่า Password ใน DB มีจริงหรือไม่
    if (!user.password) {
      return res.status(500).json({ message: "Stored password is invalid or missing" });
    }
    
    // เปรียบเทียบรหัสผ่าน
    const isMatch = bcrypt.compareSync(Password, user.password);
    
    if (isMatch) {
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });
    
      return res.json({
        message: "Login successful",
        user: {
          id: user.id,
          name: user.Name,
          token,
        },
      });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
    
  });
};
  
  module.exports = loginHandler;