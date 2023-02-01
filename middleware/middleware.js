require('dotenv').config();

const jsonwebtoken = require('jsonwebtoken');
// const refreshToken = require('../middleware/token');

module.exports = async (request, response, next) => {
    const token = request.header('Authorization');

    if (!token) {
        return response.status(401).json({
            message: 'no token available'
        });
    }
    // if (!refreshToken.includes(token)) {
    //     return response.status(403).json({
    //         message: 'no token available'
    //     });
    // }

    const decode = jsonwebtoken.verify(token, process.env.JWT_ACCESS_SECRET);
    request.id = decode.id;
    next();
}