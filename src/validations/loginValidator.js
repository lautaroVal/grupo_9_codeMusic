const {body} = require('express-validator');
const bcryptjs = require('bcryptjs');
const db = require('../database/models');

module.exports = [
    body('email')
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('Debe ser un email valido').bail(),
    body('password')
    .notEmpty().withMessage('La contraseña es obligatoria').bail()
    .custom((value, {req}) => {
        return db.User.findOne({
            where : {
                email : req.body.email.trim()
            }
        }).then(user => {
            if(!user || !bcryptjs.compareSync(value, user.password)){
                return Promise.reject()
            }
        }).catch( () => Promise.reject('Credenciales inválidas'))
    })
]