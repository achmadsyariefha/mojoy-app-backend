const { check, validationResult } = require('express-validator');

exports.runValidation = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(404).json({
            status: false,
            message: errors.array()[0].msg,
        });
    }
    next();
}

exports.validationRegister = [
    check('username', 'username tidak boleh kosong').notEmpty(),
    check('email', 'email tidak boleh kosong').notEmpty().matches(/.+\@.+\..+/).withMessage('that email format is not available'),
    check('password', 'password tidak boleh kosong').notEmpty().isLength({ min: 6 }).withMessage('jumlah karakter password kurang')
]

exports.validationLogin = [
    check('username', 'username tidak boleh kosong').notEmpty(),
    check('password', 'password tidak boleh kosong').notEmpty()
]