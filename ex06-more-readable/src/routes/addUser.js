const pool = require("../database/db");
const bcrypt = require("bcrypt");

const addUser = (req, res) => {
    const { Name, Email, Password } = req.body;
    const hashedPassword = bcrypt.hashSync(Password, 10);
    const query = "INSERT INTO User (Name, Email ,Password) VALUES (?, ?,?)";
    if (!Name || !Email || !Password) {
        return res.status(400).json({
            message: "Name, Email, and Password are required",
        });
    }
    if (Name == Email) {
        return res.status(400).json({
            message: "Name and Email cannot be the same",
        });
    }
    

    pool.query(query, [Name,Email ,hashedPassword], (err, results) => {
        if (err) {
            console.error("❌ Error adding user:", err.stack);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        res.json({message:"User added successfully" ,
            user: {name: Name ,
                Email: Email,}
        });
    });
}

module.exports = addUser;
