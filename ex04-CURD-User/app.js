const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const connection = require("./database");
require("dotenv").config(); 

connection.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.stack);
    process.exit(1);
  }
  console.log("✅ Connected to database.");
});

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
// Using this Code everwhere to avoid CORS issues
app.get('/', (req, res) => {
  res.send('✅ Server is running!');
});
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});
// -------------------------------------------------------------
app.post("/register", (req, res) => {
  const { Name, Email, Password } = req.body;
  const hashedPassword = bcrypt.hashSync(Password, 10);
  const query = "INSERT INTO Users (Name, Email ,Password) VALUES (?, ?,?)";

  connection.query(query, [Name, Email, hashedPassword], (error, results) => {
    if (error) {
      console.error("❌ Error executing query:", error);
      return res.status(500).json({
        error: "Database query failed",
      });
    }
    res.json({
      message: "User registered successfully",
    });
  });
});

app.post("/login", (req, res) => {
  const { Email, Password } = req.body;
  const query = "SELECT * FROM Users WHERE Email = ?";

  connection.query(query, [Email], (error, results) => {
    if (error) {
      console.error("❌ Error executing query:", error);
      return res.status(500).json({
        error: "Database query failed",
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const user = results[0];
    const isMatch = bcrypt.compareSync(Password, user.Password);

    if (isMatch) {
      res.json({
        message: "Login successful",
        user: {
          id: user.user_id,
          name: user.Name,
        },
      });
    } else {
      res.status(401).json({
        message: "Invalid password",
      });
    }
  });
});

app.put("/change", (req, res) => {
  const { Email, oldPass, NewPass } = req.body;
  const query = "SELECT * FROM Users WHERE Email = ?";
  if (oldPass === NewPass) {
    
  connection.query(query, [Email], (error, results) => {
    if (error) {
      console.error("❌ Error executing query:", error);
      return res.status(500).json({
        error: "Database query failed",
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    const user = results[0];
    const isMatch = bcrypt.compareSync(oldPass, user.Password);

    if (isMatch) {
      const hashedPassword = bcrypt.hashSync(NewPass, 10);
      const query = "UPDATE Users SET Password = ? WHERE Email = ?";

      connection.query(query, [hashedPassword, Email], (error) => {
        if (error) {
          console.error("❌ Error executing query:", error);
          return res.status(500).json({
            error: "Database query failed",
          });
        }
        res.json({
          message: "Password updated successfully",
        });
      });
    } else {
      res.status(401).json({
        message: "Invalid password",
        });
      }
    });
  }}
);

app.delete("/delete", (req, res) => {
  const { Email, Password } = req.body;
  const findUserQuery = "SELECT * FROM Users WHERE Email = ?";

  connection.query(findUserQuery, [Email], (findError, users) => {
    if (findError) {
      console.error("❌ Error executing find user query:", findError);
      return res.status(500).json({
        error: "Database query failed",
      });
    }

    if (users.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = users[0];
    const isMatch = bcrypt.compareSync(Password, user.Password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const deleteUserQuery = "DELETE FROM Users WHERE Email = ?";
    connection.query(deleteUserQuery,[Email],(deleteError, deleteResult) => {
        if (deleteError) {
          console.error("❌ Error executing delete query:", deleteError);
          return res.status(500).json({
            error: "Failed to delete user",
          });
        }
        
        res.json({
          message: "User deleted successfully",
          user: {
            id: user.User_id,
            name: user.Name,
          },
        });
      }
    );
  });
});

app.listen(PORT)
  .on('listening', () => {
    console.info(`[Server] Successfully started 🚀 on http://localhost:${PORT} (${process.env.NODE_ENV || 'development'} mode)`);
  })
  .on('error', (err) => {
    console.error('[Server] Failed to start:', err);
    process.exit(1);
  });
