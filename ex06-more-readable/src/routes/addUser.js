const pool = require("../database/db");

const addUser = (req, res) => {
    const { name, password,email } = req.body;
    pool.query("INSERT INTO User (Name, Password,Email) VALUES (?, ?, ?)", [name, password,email], (err, results) => {
        if (err) {
            console.error("Error adding user:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        res.json({message:"User added successfully"});
    });
}

module.exports = addUser;
