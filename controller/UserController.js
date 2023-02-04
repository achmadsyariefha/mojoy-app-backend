require('dotenv').config()

const User = require('../models/UserModel');
const token = require('../middleware/token');

const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

exports.userRegister = async (request, response) => {
    const { username, email, password } = request.body;

    const userList = await User.findOne({username: username});
    const userEmail = await User.findOne({email: email});

    if (userList) {
        return response.status(404).json({
            status: false,
            message: 'Username telah dipakai'
        })
    }

    if (userEmail) {
        return response.status(404).json({
            status: false,
            message: 'Email telah terdaftar'
        })
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    const user = new User({
        username: username,
        email: email,
        password: hashPassword
    });

    user.save();

    return response.status(201).json({
        status: true,
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
            const accessToken = await jsonwebtoken.sign(data, process.env.JWT_ACCESS_SECRET);
            const refreshToken = await jsonwebtoken.sign(data, process.env.JWT_REFRESH_SECRET);
            token.push(refreshToken);
            return response.status(201).json({
                status: true,
                message: 'Logged in',
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        } else {
            return response.status(404).json({
                status: false,
                message: 'User atau password salah',
            });
        }
    } else {
        return response.status(404).json({
            status: false,
            message: 'User atau email salah',
        });
    }
}

exports.getSingleUser = async (request, response) => {
    const user = await User.findOne({_id: request.id});
    return response.status(200).json({
        message: 'user available',
        data: user
    })
}

exports.getAllUser = async (request, response) => {
    const listUser = await User.find({});
    return response.status(200).json({
        data: listUser
    })
}

exports.updateUser = async (request, response) => {
    const userId = request.params.id;

    const { username, email, password } = request.body;
    const hashPassword = await bcryptjs.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate({_id: userId},{ username: username, email: email, password: hashPassword}, {new: true});
    return response.status(200).json({
        data: updatedUser
    })

}

