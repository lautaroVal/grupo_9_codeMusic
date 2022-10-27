const { body } = require('express-validator');
const bcryptjs = require('bcryptjs');

module.exports = [
    body('firstName')
    .notEmpty().withMessage("Debe ingresar un nombre.").bail(),
    body('lastName')
    .notEmpty().withMessage("Debe ingresar un apellido.").bail(),
]