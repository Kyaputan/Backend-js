const pool = require("../database/db");
const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
  const ID = req.user.userId;
  const { OldPass, NewPass } = req.body;
  const query = "SELECT * FROM users WHERE id = ?";

  if (OldPass === NewPass) {
    return res
      .status(400)
      .json({ message: "New password cannot be the same as old password" });
  }

  try {
    const [results] = await pool.query(query, [ID]);
    if (results.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = results[0];
    const isMatch = bcrypt.compareSync(OldPass, user.Password);

    if (isMatch) {
      const hashedPassword = bcrypt.hashSync(NewPass, 10);
      const query = "UPDATE users SET Password = ? WHERE id = ?";

      try {
        const [results] = await pool.query(query, [hashedPassword, ID]);
        if (results.length === 0) {
          console.error("❌ Error updating password:", error);
          return res.status(500).json({ error: "Database query failed" });
        }
        res.json({ message: "Password updated successfully" });
      } catch (error) {
        console.error("❌ Error updating password:", error);
        return res.status(500).json({ error: "Database query failed" });
      }
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.error("❌ Error executing query:", error);
    return res.status(500).json({ error: "Database query failed" });
  }
};

module.exports = changePassword;
