const pool = require("../database/db");

const allusers = async (req, res) => {
    const ID = req.user.userId;
    const userRole = req.user.role;

    const confirmUserQuery = "SELECT * FROM users WHERE id = ?";

    if (!ID || !userRole) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const [results] = await pool.query(confirmUserQuery, [ID]);
        if (results.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }} catch (error) {
        console.error("❌ Error executing query:", error);
        return res.status(500).json({ error: "Database query failed" });
    }
    
    const query = "SELECT * FROM users";
    
    try {
        const [results] = await pool.query(query);
        res.json({
            message: "All users",
            users: results.map(row => ({
                id: row.id,
                role: row.role,
            }))
        });
    } catch (error) {
        console.error("❌ Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

module.exports = allusers;