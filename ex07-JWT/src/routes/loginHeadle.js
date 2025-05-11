const pool = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config/config.js');

const loginHandler = (req, res) => {
    const { Email, Password } = req.body;
    const query = "SELECT * FROM User WHERE Email = ?";
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
    const isMatch = bcrypt.compareSync(Password, user.Password);
    

    const token = jwt.sign({ userId: user.UUID }, JWT_SECRET, {
    expiresIn: "1h",
});

    if (isMatch) {
      res.json({message: "Login successful",
        user: {id: user.UUID,
        name: user.Name,
        token,
        }
      });

    } else {
      res.status(401).json({message: "Invalid password"});
    }
  });
};
  
  module.exports = loginHandler;