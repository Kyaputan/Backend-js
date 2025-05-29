// Core & External modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./database/db');
const { PORT } = require('./config/config');
const ServerCheck = require('./controllers/home');
const authRoutes = require('./routes/auth');
const bookshelfRoutes = require('./routes/bookshelf');

connectDB();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));

// -------------------------------------------------------------------
// Routes
app.get("/", ServerCheck); 


app.use("/auth", authRoutes);
app.use("/bookshelf", bookshelfRoutes);
// -------------------------------------------------------------------
// Start server
app.listen(PORT).on('listening', () => {
    console.info(`[Server] Successfully started 🚀 on http://localhost:${PORT} (${process.env.NODE_ENV || 'development'} mode)`);
}).on('error', (err) => {
    console.error('[Server] Failed to start:', err);
    process.exit(1);
});
