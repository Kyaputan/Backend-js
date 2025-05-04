const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const connection = require("./database");
require("dotenv").config(); 

connection.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.stack);
    process.exit(1);
  }
  console.log("✅ Connected to database.");
});

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Using this Code everwhere to avoid CORS issues

app.get('/', (req, res) => {
  res.send('✅ Server is running!');
});
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// -------------------------------------------------------------
// CRUD operations for books
app.get("/books", (req, res) => {
  connection.query("SELECT * FROM books", (err, results) => {
    if (err) {
      console.error("❌ Error fetching books:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

app.get("/books/available", (req, res) => {
  connection.query("SELECT * FROM books WHERE Is_borrowed = 0", (err, results) => {
    if (err) {
      console.error("❌ Error fetching books:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

app.get("/books/borrowed", (req, res) => {
  connection.query("SELECT * FROM books WHERE Is_borrowed = 1", (err, results) => {
    if (err) {
      console.error("❌ Error fetching books:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.length === 0) {
      return res.status(200).json({ message: "No borrowed books." });
    }
    res.json(results);
  });
});

app.put("/books/borrow/:id", (req, res) => {
  const bookId = req.params.id;

  connection.query("UPDATE books SET Is_borrowed = 1 WHERE Book_ID = ?", [bookId], (err, results) => {
    if (err) {
      console.error("❌ Error borrowing book:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    // เช็คว่าแถวถูกเปลี่ยนแปลงจริงหรือไม่ (หมายความว่าเป็นหนังสือที่ยังไม่ได้ยืม)
    if (results.changedRows > 0) {
      connection.query("SELECT * FROM books WHERE Book_ID = ?", [bookId], (err, bookResults) => {
        if (err) {
          console.error("❌ Error fetching book details:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        const book = bookResults[0];
        res.json({
          message: "Book borrowed successfully!",
          book: {
            id: book.Book_ID,
            name: book.Title,  
          },
        });
      });
    } else {
      connection.query("SELECT * FROM books WHERE Book_ID = ?", [bookId], (err, bookResults) => {
        if (err) {
          console.error("❌ Error fetching book details:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        const book = bookResults[0];
        res.json({
          message: "Book already borrowed.",
          book: {
            id: book.Book_ID,
            name: book.Title,  
          },
        });
      });
    }
  });
});

app.put("/books/return/:id", (req, res) => {
  const bookId = req.params.id;

  connection.query("UPDATE books SET Is_borrowed = 0 WHERE Book_ID = ?", [bookId], (err, results) => {
    if (err) {
      console.error("❌ Error returning book:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    // เช็คว่าแถวถูกเปลี่ยนแปลงหรือไม่ (หมายความว่าหนังสือถูกยืมอยู่แล้ว)
    if (results.changedRows > 0) {
      connection.query("SELECT * FROM books WHERE Book_ID = ?", [bookId], (err, bookResults) => {
        if (err) {
          console.error("❌ Error fetching book details:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        const book = bookResults[0];
        res.json({
          message: "Book returned successfully!",
          book: {
            id: book.Book_ID,
            name: book.Title, 
          },
        });
      });
    } else {
      // ดึงข้อมูลหนังสือที่คืนไปแล้ว
      connection.query("SELECT * FROM books WHERE Book_ID = ?", [bookId], (err, bookResults) => {
        if (err) {
          console.error("❌ Error fetching book details:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        const book = bookResults[0];
        res.json({
          message: "Book already returned.",
          book: {
            id: book.Book_ID,
            name: book.Title,
          },
        });
      });
    }
  });
});



// -------------------------------------------------------------
app.listen(PORT)
  .on('listening', () => {
    console.info(`[Server] Successfully started 🚀 on http://localhost:${PORT} (${process.env.NODE_ENV || 'development'} mode)`);
  })
  .on('error', (err) => {
    console.error('[Server] Failed to start:', err);
    process.exit(1);
  });
