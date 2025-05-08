const pool = require("../database/db");
const bcrypt = require("bcrypt");

const deleteUser = (req, res) => {
    const { Email, Password } = req.body;
    const findUserQuery = "SELECT * FROM User WHERE Email = ?";
    if (!Email || !Password) {
        return res.status(400).json({
            message: "Email and password are required",
        });
    }

    pool.query(findUserQuery, [Email], (findError, users) => {
    if (findError) {
        console.error("❌ Error executing find user query:", findError);
        return res.status(500).json({error: "Database query failed"});
    }
  
    if (users.length === 0) {
        return res.status(404).json({message: "User not found"});
    }
  
    const user = users[0];
    const isMatch = bcrypt.compareSync(Password, user.Password);
  
    if (!isMatch) {
        return res.status(401).json({message: "Invalid password"});
    }
  
    const deleteUserQuery = "DELETE FROM User WHERE Email = ?";
    
    pool.query(deleteUserQuery,[Email],(deleteError, deleteResult) => {
        if (deleteError) {
            console.error("❌ Error executing delete query:", deleteError);
            return res.status(500).json({error: "Failed to delete user"});
        }
          
        res.json({message: "User deleted successfully",user: {id: user.User_id,name: user.Name,},});
    });
    });
};

module.exports = deleteUser;
  