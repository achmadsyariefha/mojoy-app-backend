const express = require('express');
const router = express.Router();

const {addProduct} = require('../controller/ProductController');

router.post('/add/:user', addProduct);

module.exports = router;