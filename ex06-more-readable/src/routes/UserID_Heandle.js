const pool = require("../database/db");

const UserbyID = (req, res) => {

    const UserID = req.params.id;
    const query = "SELECT * FROM User WHERE UUID = ?"
    
    pool.query(query, [UserID], (err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        res.json(results);
    });
};
  
  module.exports = UserbyID;