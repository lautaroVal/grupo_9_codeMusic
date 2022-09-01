const { body } = require('express-validator');

module.exports = [
    body('firstName').notEmpty().bail().withMessage("Debe ingresar un nombre"),
    body('lastName').notEmpty().withMessage("Debe ingresar un nombre"),
    body('email').notEmpty().withMessage("Debe ingresar un nombre"),
    body('password').notEmpty().withMessage("Debe ingresar un nombre"),
    body('password2').notEmpty().withMessage("Debe ingresar un nombre")
]