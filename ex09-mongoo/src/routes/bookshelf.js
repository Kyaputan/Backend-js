const express = require('express');
const router = express.Router();
const { addBook, deleteBook, updateBook } = require('../controllers/add_delete_book');
const validate = require('../middleware/validate');
const { addBookSchema , deleteBookSchema , updateBookSchema } = require('../validators/valbook');
const { requireLogin } = require('../middleware/auth');
const { checkRole } = require('../middleware/auth');

router.post('/addbook', requireLogin,validate(addBookSchema),checkRole("admin"), addBook );
router.delete('/deletebook/:id',requireLogin, validate(deleteBookSchema) ,checkRole("admin") , deleteBook );
router.patch('/updatebook/:id',requireLogin, validate(updateBookSchema) ,checkRole("admin") , updateBook );

module.exports = router;