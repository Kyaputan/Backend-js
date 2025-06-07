const express = require('express');
const { requireLogin } = require('../middleware/auth');
const router = express.Router();
const {borrowedBook , givebackBook , allbook , myborrowedBook , bookbyid} = require('../controllers/borrow');
const { idBookSchema } = require('../validators/valbook');
const validate = require('../middleware/validate');

router.post('/borrow/:id', requireLogin, validate(idBookSchema), borrowedBook);
router.post('/giveback/:id', requireLogin, validate(idBookSchema), givebackBook);
router.get('/', allbook);
router.get('/myborrowed', requireLogin, myborrowedBook);
router.get('/:id', validate(idBookSchema), bookbyid);

module.exports = router;
