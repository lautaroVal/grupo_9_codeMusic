const { body } = require('express-validator');
const db = require('../database/models')

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
        .isEmail().withMessage('Debe ingresar un correo electrónico válido.')
        .custom((value, {req}) => {
             return db.User.findOne({
            where : {
                email : value.trim()
            }
        }).then(user => {
            if(user){
                return Promise.reject()
            }
        }).catch( () => Promise.reject('El usuario ya está registrado!'))
    }),

    body('password')
        .notEmpty().withMessage("Debe ingresar una contraseña.").bail()
        .isLength({ min: 6, max: 12 }).withMessage('Debe tener entre 6 y 12 caracteres.'),

    body('password2')
        .notEmpty().withMessage("Debe reingresar tu contraseña.").bail()
        .isLength({ min: 6, max: 12 }).withMessage('Debe tener entre 6 y 12 caracteres.')
        .custom((values,{req}) => {
            if(values !== req.body.password){
                return false
            } else{
                return true
            }
        }).withMessage('Las contraseñas no coinciden'),
        body('terminos')
        .isString('on').withMessage('Debes aceptar las bases y condiciones')
]

