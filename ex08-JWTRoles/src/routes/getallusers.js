const pool = require("../database/db");

const allusers = async (req, res) => {

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


// {
//     "message": "All users",
//     "users": {
//       "id": 1,
//       "created_at": "2025-05-11T12:28:46.437Z",
//       "updated_at": "2025-05-11T12:28:46.437Z",
//       "deleted_at": null,
//       "name": "Rachata-1234",
//       "email": "Rachata@gmail.com",
//       "password": "$2a$10$UPq.XLg2BRwh5b2j6.OoLuXa.IRvEL3fTSpiaRQkgjcqbt.tJmiiq",
//       "role": "admin"
//     }
//   }