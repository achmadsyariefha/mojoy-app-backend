require('dotenv').config()

const User = require('../models/UserModel');

const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

exports.userRegister = async (request, response) => {
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

exports.userLogin = async (request, response) => {
    const { username, password } = request.body;
    const usernameData = await User.findOne({$or: [{username: username}, {email: username}]});

    if (usernameData) {
        const passwordData = await bcryptjs.compare(password, usernameData.password);
        if (passwordData) {
            const data = {
                id: usernameData._id,
            }
            const token = await jsonwebtoken.sign(data, process.env.JWT_SECRET);
            return response.status(200).json({
                message: 'Logged in',
                token: token,
            });
        } else {
            return response.status(404).json({
                message: 'User atau password salah',
            });
        }
    } else {
        return response.status(404).json({
            message: 'User atau password salah',
        });
    }
}