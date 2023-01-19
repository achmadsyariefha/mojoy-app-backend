const User = require('../models/UserModel');
const bcryptjs = require('bcryptjs');

exports.userList = async (request, response) => {
    const { username, email, password } = request.body;

    const hashPassword = await bcryptjs.hash(password, 10);

    const user = new User({
        username: username,
        email: email,
        password: hashPassword
    });

    user.save();

    return response.status(200).json({
        message: 'User telah dibuat'
    });
}