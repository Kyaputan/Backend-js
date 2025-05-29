const Book = require("../models/Book");

exports.addBook = async (req, res) => {
    const { title, content, author, image } = req.body;
    try {
        const book = await Book.create({ title, content, author, image });
        if (!book) {
            return res.status(400).json({ error: "Book already exists" });
        }
        res.json({message:"Book added successfully", book });
    } catch (err) {
        return res.status(400).json({ error: "Book already exists" });
    }
};

exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByIdAndDelete(id).exec();
        if (!book) {
            return res.status(400).json({ error: "Book not found" });
        }
        res.json({message:"Book deleted successfully", book });
    } catch (err) {
        return res.status(400).json({ error: "Book not found" });
    }
};

exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, content, author, image } = req.body;

    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (content !== undefined) updateFields.content = content;
    if (author !== undefined) updateFields.author = author;
    if (image !== undefined) updateFields.image = image;

    try {
        const updatedBook = await Book.findByIdAndUpdate(id,
            updateFields,
            { new: true }).exec();

        if (!updatedBook) {
            return res.status(404).json({ error: "Book not found" });
        }

        res.json({message: "Book updated successfully", 
                book: updatedBook});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

