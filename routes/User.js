const express = require('express');
const router = express.Router();
const { userList } = require('../controller/UserController');

router.post('/daftar', userList);

module.exports = router;