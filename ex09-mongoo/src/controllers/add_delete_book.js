const Book = require("../models/Book");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET, bcrypt_salt_rounds } = require("../config/config");



exports.addBook = async (req, res) => {
    const { title, content, author, image } = req.body;
    try {
        const book = await Book.create({ title, content, author, image });
        res.json({message:"Book added successfully", book });
    } catch (err) {
        return res.status(400).json({ error: "Book already exists" });
    }
};

exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(400).json({ error: "Book not found" });
        }
        res.json({message:"Book deleted successfully", book });
    } catch (err) {
        return res.status(400).json({ error: "Book not found" });
    }
};
