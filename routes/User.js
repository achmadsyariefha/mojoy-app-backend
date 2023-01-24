const express = require('express');
const router = express.Router();

const { userRegister, userLogin, getSingleUser } = require('../controller/UserController');
const { runValidation, validationRegister, validationLogin } = require('../validation');
const middleware = require('../middleware/middleware');

router.post('/daftar', validationRegister, runValidation, userRegister);
router.post('/login', validationLogin, runValidation, userLogin);
router.get('/user', middleware, getSingleUser);
// router.put('/user/:id');

module.exports = router;