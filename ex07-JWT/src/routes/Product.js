const pool = require("../database/db");
const Product = (req, res) => {
    const query = "SELECT * FROM products";
    pool.query(query, (error, results) => {
        if (error) {
            console.error("❌ Error executing query:", error);
            return res.status(500).json({error: "Database query failed"});
        }
        res.json({ 
            message: "✅ Server is running!" , 
            User_ID:  req.user.userId,
            products: results.map(row => ({
                name: row.name,
                price:row.price
            }))
        }); 
    });
};
  
module.exports = Product;
  