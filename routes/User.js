const express = require('express');
const router = express.Router();

const { userRegister, userLogin, getSingleUser, getAllUser } = require('../controller/UserController');
const { runValidation, validationRegister, validationLogin } = require('../validation');
const middleware = require('../middleware/middleware');

router.post('/daftar', validationRegister, runValidation, userRegister);
router.post('/login', validationLogin, runValidation, userLogin);
router.get('/user/id', middleware, getSingleUser);
router.get('/user/all', getAllUser)
// router.put('/user/:id');

module.exports = router;