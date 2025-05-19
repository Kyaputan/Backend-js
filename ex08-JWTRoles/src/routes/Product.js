const pool = require("../database/db");

const Product = async (req, res) => {
  const ID = req.user.userId;
  const userRole = req.user.role;

  const confirmUserQuery = "SELECT * FROM users WHERE id = ?";

  if (!ID || !userRole) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {

    const [resultsUser] = await pool.query(confirmUserQuery, [ID]);
    if (resultsUser.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const queryProduct = "SELECT * FROM products";
    const [resultsProducts] = await pool.query(queryProduct);
    res.json({
      message: "Our Products",
      email:   req.user.email,
      User_ID: req.user.userId,
      role:    req.user.role,
      products: resultsProducts.map((row) => ({
        name:   row.product_name,
        price:  row.prices,
        stock:  row.stock,
      })),
    });
  } catch (error) {
    console.error("❌ Error executing query:", error);
    return res.status(500).json({ error: "Database query failed" });
  }
};

module.exports = Product;
