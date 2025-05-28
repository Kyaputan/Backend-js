const expressjwt = require("express-jwt");
const { JWT_SECRET } = require("../config/config");

exports.requireLogin = expressjwt({
    secret: JWT_SECRET,
    algorithms: ["HS256"],
    requestProperty: "auth",
});


exports.checkRole = (role) => {
    return (req, res, next) => {
        if (req.auth && req.auth.role === role) {
            next();
        } else {
            return res.status(403).json({ message: "Forbidden: Insufficient role" });
        }
    };
};