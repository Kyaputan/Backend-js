const pool = require("../database/db");
const bcrypt = require("bcrypt");


const changePassword = (req, res) => {
  const ID = req.user.userId
  const { OldPass, NewPass } = req.body;
  const query = "SELECT * FROM users WHERE id = ?";


  if (OldPass === NewPass) {
    return res.status(400).json({message: "New password cannot be the same as old password",});
  }


  pool.query(query, [ID], (error, results) => {
    if (error) {
      console.error("❌ Error executing query:", error);
      return res.status(500).json({ error: "Database query failed" });
    }


    if (results.length === 0) {
      return res.status(401).json({message: "User not found"});
    }


    const user = results[0];
    const isMatch = bcrypt.compareSync(OldPass, user.Password);


    if (isMatch) {

      const hashedPassword = bcrypt.hashSync(NewPass, 10);
      const query = "UPDATE users SET Password = ? WHERE id = ?";

      pool.query(query, [hashedPassword, ID], (error) => {
        if (error) {
          console.error("❌ Error executing query:", error);
          return res.status(500).json({ error: "Database query failed" });
        }
        res.json({message: "Password updated successfully"});
      });
    } else {
      res.status(401).json({message: "Invalid password"});
    }
  });
};

module.exports = changePassword;
