require('dotenv').config();

const jsonwebtoken = require('jsonwebtoken');
const refreshTokens = require("../middleware/token");

module.exports = async (response, request, next) => {
    const refreshToken = request.header('Authorization');

    if (!refreshToken) {
        return response.status(401).json({
            message: 'no token available'
        });
    }

    const decode = jsonwebtoken.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    request.id = decode.id;
    next();
}