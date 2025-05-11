// Core & External modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

// Internal modules
const ServerCheck = require("./routes/home");
const Singup = require("./routes/SingupHeadle");
const Login = require("./routes/loginHeadle");
const ChangePassword = require("./routes/changePassword");
const DeleteUser = require("./routes/deleteUser");
const logger = require("./middleware/tracker");
const authenticate = require("./middleware/authenticate");
const Product = require("./routes/Product");
// Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// -------------------------------------------------------------------
// Routes

// Free authenticate
app.get("/", ServerCheck);
app.post("/user/singup", Singup);
app.post("/user/login", Login);

// Authenticate
app.use(authenticate);
app.use(logger);

// Authenticate

app.get("/user/Product", Product);
app.put("/user/change", ChangePassword);
app.delete("/user/delete", DeleteUser);

// -------------------------------------------------------------------
// Start server
app.listen(PORT).on('listening', () => {
    console.info(`[Server] Successfully started 🚀 on http://localhost:${PORT} (${process.env.NODE_ENV || 'development'} mode)`);
}).on('error', (err) => {
    console.error('[Server] Failed to start:', err);
    process.exit(1);
});
