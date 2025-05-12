const pool = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config/config.js');

const loginHandler = async (req, res) => {
  
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

    try {
      const [results] = await pool.query(query, [Email]);
      if (results.length === 0) {
        return res.status(401).json({message: "User not found"});
        }
      
      const user = results[0];
      const isMatch = await bcrypt.compare(Password, user.password);
      
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
        }

        const payload = {
          userId: user.id,
          email:  user.email,
          role:   user.role};

        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "1h",});
        console.log("✅ User logged in:", user.email);

        return res.json({
          message: "Login successful",
          user: {
            userId: user.id,
            name: user.Name,
            role: user.role,
            token,
          },
        });
      } catch (error) {
        console.error("❌ Error executing query:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
  
module.exports = loginHandler;