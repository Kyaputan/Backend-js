const Book = require("../models/Book");
const UserDB = require("../models/User");

exports.borrowedBook = async (req, res) => {
    const { id } = req.params;
    const userId = req.auth._id;

    try {
        const book = await Book.findById(id).exec();
        console.log(book);
        if (!book) {
            return res.status(400).json({ error: "Book not found" });
        }

        const user = await UserDB.findById(userId).exec();
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        if(book.borrowing){
            return res.status(400).json({ error: "Book is already borrowed" });
        }
        if (book.who && book.who.toString() !== user._id.toString()) {
            return res.status(400).json({ error: "Book is not borrowed by this user" });
        }
        book.borrowing = true;
        book.who = user._id;
        await book.save();

        res.json({ message: "Book borrowed successfully", book });
    } catch (err) {
        return res.status(400).json({ error: "Book not found " + err });
    }
}

exports.givebackBook = async (req, res) => {
    const { id } = req.params;
    const userId = req.auth._id;
    try {
        const book = await Book.findById(id).exec();
        if (!book) {
            return res.status(400).json({ error: "Book not found" });
        }
        
        const user = await UserDB.findById(userId).exec();
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        if(!book.borrowing){
            return res.status(400).json({ error: "Book is not borrowed" });
        }
        if(book.who && book.who.toString() !== user._id.toString()){
            return res.status(400).json({ error: "Book is not borrowed by this user" });
        }
        book.borrowing = false;
        book.who = null;
        await book.save();

        res.json({ message: "Book given back successfully", book });
    } catch (err) {
        return res.status(400).json({ error: "Book not found " + err });
    }
    
}

exports.allbook = async (req, res) => {
    try {
        const books = await Book.find().exec();
        res.json(books);
    } catch (err) {
        return res.status(400).json({ error: "Books not found" });
    }
}

exports.myborrowedBook = async (req, res) => {
    const userId = req.auth._id;
    try {
        const books = await Book.find({ who: userId }).exec();
        res.json(books);
    } catch (err) {
        return res.status(400).json({ error: "Books not found" });
    }
}

exports.bookbyid = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id).exec();
        if (!book) {
            return res.status(400).json({ error: "Book not found" });
        }
        res.json(book);
    } catch (err) {
        return res.status(400).json({ error: "Books not found" });
    }
}