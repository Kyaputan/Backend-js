const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config/config.js');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided - 1" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired - 2" });
        }
        return res.status(403).json({ message: "Invalid token - 3" });
    }
};

module.exports = authenticate;
