const express = require('express');
const router = express.Router();
const { Register, Login } = require('../controllers/login_register_controller');
const validate = require('../middleware/validate');
const { registerSchema , loginSchema } = require('../validators/auth');

router.post('/register', validate(registerSchema), Register);
router.post('/login', validate(loginSchema), Login);

module.exports = router;
