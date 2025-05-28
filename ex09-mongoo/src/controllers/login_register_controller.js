const UserDB = require("../models/User");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const bcrypt = require("bcrypt");
const { JWT_SECRET, bcrypt_salt_rounds } = require("../config/config");

exports.Register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(bcrypt_salt_rounds);
        const hash = await bcrypt.hash(password, salt);
        const user = await UserDB.create({ name, email, password: hash });
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (err) {
        return res.status(400).json({ error: "Email already exists" });
    }
};

exports.Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserDB.findOne({ email }).exec();
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Password incorrect" });
        }
        const payload = { _id: user._id, name: user.name, email: user.email, role: user.role };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
        res.json({ token, user: payload });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.requireLogin = expressjwt({
    secret: JWT_SECRET,
    algorithms: ["HS256"],
    requestProperty: "auth",
});
