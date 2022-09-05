const {body} = require('express-validator');
const bcryptjs = require('bcryptjs');
const users = require('../data/usersModule').loadUsers();

module.exports = [
    body('email')
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('Debe ser un email valido').bail(),
    body('password')
    .notEmpty().withMessage('La contraseña es obligatoria').bail()
    .custom((value, {req}) => {
        let user = users.find(user => user.email === req.body.email.trim() && bcryptjs.compareSync(value,user.password));
        return !!user
    }).withMessage('Credenciales invalidas')
]