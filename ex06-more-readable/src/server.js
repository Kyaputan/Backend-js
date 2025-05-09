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
const Singup = require("./routes/SingupHeadle");
const Login = require("./routes/loginHeadle");
const ChangePassword = require("./routes/changePassword");
const DeleteUser = require("./routes/deleteUser");
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
app.post("/singup", Singup);
app.post("/login", Login);

// PUT
app.put("/change", ChangePassword);


// DELETE
app.delete("/delete", DeleteUser);
// -------------------------------------------------------------------
// Start server
app.listen(PORT).on('listening', () => {
    console.info(`[Server] Successfully started 🚀 on http://localhost:${PORT} (${process.env.NODE_ENV || 'development'} mode)`);
}).on('error', (err) => {
    console.error('[Server] Failed to start:', err);
    process.exit(1);
});
