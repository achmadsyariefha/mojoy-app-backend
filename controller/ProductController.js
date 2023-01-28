const Product = require('../models/ProductModel');
const User = require('../models/UserModel');

exports.addProduct = async (request, response) => {
    const id = request.params.id;
    const {name, category, price} = request.body;
    const user = await User.findOne({_id: id});
    const product = new Product({
        name: name,
        category: category,
        price: price,
        createdBy: user.name
    });

    product.save();

    return response.status(201).json({
        status: true,
        message: 'Product telah dibuat',
        data: product
    });
}