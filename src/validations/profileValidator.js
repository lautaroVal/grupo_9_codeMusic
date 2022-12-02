const { body } = require('express-validator');
const bcryptjs = require('bcryptjs');

module.exports = [
    body('firstName')
    .notEmpty().withMessage("Debe ingresar un nombre.").bail()
    .isAlpha('en-US').withMessage('Debe ingresar solo letras.').bail()
    .isLength({ min: 3 }).withMessage('Debe contener 3 caracteres como mínimo.').bail()
    .isLength({ max: 60 }).withMessage('Debe contener 60 caracteres como máximo.'),

    body('lastName')
    .notEmpty().withMessage("Debe ingresar un apellido.").bail()
    .isAlpha('en-US').withMessage('Debe ingresar solo letras.').bail()
    .isLength({ min: 3 }).withMessage('Debe contener 3 caracteres como mínimo.').bail()
    .isLength({ max: 60 }).withMessage('Debe contener 60 caracteres como máximo.'),

]