// Core & External modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

// Internal modules
const { logger } = require("./Middleware");
const homeHandler = require("./routes/home");

// Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

// Routes
app.get("/", homeHandler);

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
