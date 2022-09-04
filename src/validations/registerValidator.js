const { body } = require('express-validator');

module.exports = [
    body('firstName')
        .notEmpty().withMessage("Debe ingresar un nombre.").bail()
        .isAlpha('en-US').withMessage('Debe ingresar solo letras.').bail()
        .isLength({ min: 3 }).withMessage('Debe contener 3 caracteres como mínimo.').bail()
        .isLength({ max: 60 }).withMessage('Debe contener 60 caracteres como máximo.'),
    body('lastName')
        .notEmpty().withMessage("Debe ingresar un apellido.").bail()
        .isAlpha('en-US').withMessage('Debe ingresar solo letras.').bail()
        .isLength({ min: 3 }).withMessage('Debe contener 3 caracteres como mínimo.')
        .isLength({ max: 60 }).withMessage('Debe contener 60 caracteres como máximo.'),
    body('email')
        .notEmpty().withMessage("Debe ingresar un email.").bail()
        .isEmail().withMessage('Debe ingresar un correo electrónico válido.'),
    body('password')
        .notEmpty().withMessage("Debe ingresar una contraseña.").bail()
        .isLength({ min: 6, max: 12 }).withMessage('Debe tener entre 6 y 12 caracteres.'),
    body('password2')
        .notEmpty().withMessage("Debe reingresar tu contraseña.").bail()
        .isLength({ min: 6, max: 12 }).withMessage('Debe tener entre 6 y 12 caracteres.'),
]

