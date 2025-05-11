const pool = require("../database/db");
const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
  const ID = req.user.userId;
  const { OldPass, NewPass } = req.body;
  const confirmUserQuery = "SELECT * FROM users WHERE id = ?";

  if (OldPass === NewPass) {
    return res.status(400).json({
      message: "New password cannot be the same as old password",
    });
  }

  try {
    const [results] = await pool.query(confirmUserQuery, [ID]);

    if (results.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = results[0];
    const isMatch = bcrypt.compareSync(OldPass, user.Password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const hashedPassword = bcrypt.hashSync(NewPass, 10);
    const updatePasswordQuery = "UPDATE users SET Password = ? WHERE id = ?";

    try {
      const [updateResults] = await pool.query(updatePasswordQuery, [hashedPassword, ID]);

      if (updateResults.length === 0) {
        console.error("❌ Error updating password:", error);
        return res.status(500).json({ error: "Database query failed" });
      }

      return res.json({ message: "Password updated successfully" });

    } catch (error) {
      console.error("❌ Error updating password:", error);
      return res.status(500).json({ error: "Database query failed" });
    }
  } catch (error) {
    console.error("❌ Error executing query:", error);
    return res.status(500).json({ error: "Database query failed" });
  }
};

module.exports = changePassword;
