const pool = require("../database/db");
const bcrypt = require("bcrypt");

const SingupHandler = async (req, res) => {

    const { Name, Email, Password } = req.body;
    const hashedPassword = bcrypt.hashSync(Password, 10);
    
    if (!Name || !Email || !Password) {
        return res.status(400).json({
            message: "Name, Email, and Password are required",
        });
    }
    
    const query = "INSERT INTO users (Name, Email ,Password,role ,created_at ,updated_at) VALUES (?, ?,?,?)";
    const role = "user";
    const createdAt = new Date();
    const updatedAt = new Date();

    try {
    const [results] = await pool.query(query, [Name,Email ,hashedPassword ,role,createdAt,updatedAt]);
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
