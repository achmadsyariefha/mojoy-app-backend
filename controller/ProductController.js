const Product = require('../models/ProductModel');
const User = require('../models/UserModel');

exports.addProduct = async (request, response) => {
    const user = request.params.user;
    const {name, category, price} = request.body;
    const product = new Product({
        name: name,
        category: category,
        price: price,
        createdBy: user
    });

    product.save();

    return response.status(201).json({
        status: true,
        message: 'Product telah dibuat',
        data: product
    });
}