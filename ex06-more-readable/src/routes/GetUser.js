const pool = require("../database/db");

const AllUser = (req, res) => {
    const query = "SELECT * FROM User";

    pool.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        res.json(results);
    });
};

module.exports = AllUser;