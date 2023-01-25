const express = require('express');
const router = express.Router();

const {addProduct} = require('../controller/ProductController');

router.post('/user/product', addProduct);

module.exports = router;