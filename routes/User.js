const express = require('express');
const router = express.Router();
const { userRegister, userLogin } = require('../controller/UserController');

router.post('/daftar', userRegister);
router.post('/login', userLogin);

module.exports = router;