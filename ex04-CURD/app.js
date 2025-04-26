const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const connection = require("./DB.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
dotenv.config();

const PORT = process.env.PORT || 3000;

connection.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.stack);
    return;
  }
  console.log("✅ Connected to database.");
});

app.post("/register", (req, res) => {
  const { Name, Email, Password } = req.body;
  const hashedPassword = bcrypt.hashSync(Password, 10);
  const query = "INSERT INTO Users (Name, Email ,Password) VALUES (?, ?,?)";
  connection.query(query, [Name, Email, hashedPassword], (error, results) => {
    if (error) {
      console.error("❌ Error executing query:", error);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json({ message: "User registered successfully" });
  });
});

app.post("/login", (req, res) => {
  const { Email, Password } = req.body;
  const query = "SELECT * FROM Users WHERE Email = ?";
  connection.query(query, [Email], (error, results) => {
    if (error) {
      console.error("❌ Error executing query:", error);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = results[0];
    const isMatch = bcrypt.compareSync(Password, user.Password);
    if (isMatch) {
      res.json({
        message: "Login successful",
        user: { id: user.user_id, name: user.Name },
      });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  });
});

app.put("/change", (req, res) => {
  const { Email, oldPass, NewPass } = req.body;
  const query = "SELECT * FROM Users WHERE Email = ?";
  connection.query(query, [Email], (error, results) => {
    if (error) {
      console.error("❌ Error executing query:", error);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }
    const user = results[0];
    const isMatch = bcrypt.compareSync(oldPass, user.Password);
    if (isMatch) {
      const hashedPassword = bcrypt.hashSync(NewPass, 10);
      const query = "UPDATE Users SET Password = ? WHERE Email = ?";
      connection.query(query, [hashedPassword, Email], (error, results) => {
        if (error) {
          console.error("❌ Error executing query:", error);
          return res.status(500).json({ error: "Database query failed" });
        }
        res.json({ message: "Password updated successfully" });
      });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
