const { body } = require('express-validator');

module.exports = [
    body('firstName')
    .notEmpty().withMessage("El nombre es requerido.").bail()
    .isAlpha('en-US').withMessage('Solo se permiten caracteres alfabéticos.').bail()
    .isLength({ min: 3 }).withMessage('El nombre debe tener como mínimo 3 caracteres.').bail()
    .isLength({ max: 60 }).withMessage('El nombre no puede superar los 60 caracteres.'),

    body('lastName')
    .notEmpty().withMessage("El apellido es requerido.").bail()
    .isAlpha('en-US').withMessage('Solo se permiten caracteres alfabéticos.').bail()
    .isLength({ min: 3 }).withMessage('El apellido debe tener como mínimo 3 caracteres.').bail()
    .isLength({ max: 60 }).withMessage('El apellido no puede superar los 60 caracteres.'),
]