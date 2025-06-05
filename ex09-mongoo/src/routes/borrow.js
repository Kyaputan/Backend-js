const express = require('express');
const { requireLogin } = require('../middleware/auth');
const router = express.Router();
const {borrowedBook , givebackBook , allbook , myborrowedBook , bookbyid} = require('../controllers/borrow');

router.post('/borrow/:id', requireLogin, borrowedBook);
router.post('/giveback/:id', requireLogin, givebackBook);
router.get('/', allbook);
router.get('/myborrowed', requireLogin, myborrowedBook);
router.get('/:id', bookbyid);

module.exports = router;
