const express = require('express');
const router = express.Router();
const { addBook, deleteBook } = require('../controllers/add_delete_book');
const validate = require('../middleware/validate');
const { addBookSchema , deleteBookSchema } = require('../validators/valbook');
const { requireLogin } = require('../middleware/auth');
const { checkRole } = require('../middleware/auth');

router.post('/addbook', validate(addBookSchema),requireLogin, addBook );
router.delete('/deletebook/:id',requireLogin, validate(deleteBookSchema) ,checkRole("admin") , deleteBook );

module.exports = router;