const pool = require("../database/db");

const AllUser = (req, res) => {
    pool.query("SELECT * FROM User", (err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        res.json(results);
    });
};

module.exports = AllUser;