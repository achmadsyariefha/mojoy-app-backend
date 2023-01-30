const express = require('express');
const router = express.Router();

const {addProduct, updateProduct} = require('../controller/ProductController');

router.post('/add/:user', addProduct);
router.patch('/list/:id', updateProduct);

module.exports = router;