// Core & External modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

// Internal modules
const { logger } = require("./middleware/tracker");
const ServerCheck = require("./routes/home");
const UserbyID = require("./routes/UserID_Heandle");
const AllUser = require("./routes/GetUser");
const addUser = require("./routes/addUser");
const login = require("./routes/loginHeadle");
const changePassword = require("./routes/changePassword");
const deleteUser = require("./routes/deleteUser");
// Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

// -------------------------------------------------------------------
// Routes
// GET
app.get("/", ServerCheck);
app.get("/user", AllUser);
app.get("/user/:id" ,UserbyID);

// POST
app.post("/singup", addUser);
app.post("/login", login);

// PUT
app.put("/change", changePassword);


// DELETE
app.delete("/delete", deleteUser);
// -------------------------------------------------------------------
// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT} ✅`)
);
