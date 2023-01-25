const Product = require('../models/ProductModel');

exports.addProduct = (request, response) => {
    const {name, category, price} = request.body;
    const product = new Product({
        name: name,
        category: category,
        price: price,
        // createdBy: request.user._id
    });

    product.save();

    return response.status(201).json({
        status: true,
        message: 'Product telah dibuat',
        data: product
    });
}