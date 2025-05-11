const pool = require("../database/db");
const bcrypt = require("bcrypt");

const SingupHandler = async (req, res) => {
    const { Name, Email, Password } = req.body;
    const hashedPassword = bcrypt.hashSync(Password, 10);
    const query = "INSERT INTO users (Name, Email ,Password) VALUES (?, ?,?)";
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
    

    try {
    const [results] = await pool.query(query, [Name,Email ,hashedPassword]);
        if (results.length === 0) {
            console.error("❌ Error adding user:", err.stack);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        res.json({message:"User added successfully" ,
            user: {name: Name ,
                Email: Email,}
        });
    } catch (error) {
        console.error("❌ Error adding user:", error.stack);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = SingupHandler;
