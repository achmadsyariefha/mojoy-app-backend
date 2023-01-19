const express = require('express');
const router = express.Router();

const { userRegister, userLogin } = require('../controller/UserController');
const { runValidation, validationRegister, validationLogin } = require('../validation');

router.post('/daftar', validationRegister, runValidation, userRegister);
router.post('/login', validationLogin, runValidation, userLogin);

module.exports = router;