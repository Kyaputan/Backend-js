const pool = require("../database/db");
const bcrypt = require("bcrypt");

const deleteUser = (req, res) => {
    
    const Id =req.user.userId
    const { Password } = req.body;
    const findUserQuery = "SELECT * FROM users WHERE id = ?";
    
    if (!Password) {
        return res.status(400).json({message: "Password is required"});
    }

    pool.query(findUserQuery, [Id], (findError, users) => {
    if (findError) {
        console.error("❌ Error executing find user query:", findError);
        return res.status(500).json({error: "Database query failed"});
    }
  
    if (users.length === 0) {
        return res.status(404).json({message: "User not found"});
    }
  
    const user = users[0];
    bcrypt.compare(Password, user.password, (err, isMatch) => {
        if (err) {
            console.error("❌ Error comparing passwords:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
    
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const deleteUserQuery = "DELETE FROM users WHERE id = ?";
        
        pool.query(deleteUserQuery, [Id], (deleteError, deleteResult) => {
            if (deleteError) {
                console.error("❌ Error executing delete query:", deleteError);
                return res.status(500).json({ error: "Failed to delete user" });
            }
    
            res.json({
                message: "User deleted successfully",
                user: {
                    id: user.id,
                    name: user.Name,
                },
            });
        });
    });
    });
};

module.exports = deleteUser;
  