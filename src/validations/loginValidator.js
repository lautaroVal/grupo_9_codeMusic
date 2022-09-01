const {body} = require('express-validator');
const bcryptjs = require('bcryptjs');


module.exports = [
    body('email')
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('Debe ser un email valido').bail(),
    body('password')
    .notEmpty().withMessage('La contraseña es obligatoria').bail()
    .custom((value, {req}) => {
        let user = users.find(user => user.email === req.body.email.trim() && bcryptjs.compareSync(value,user.password));
        console.log(user);
 
        if(!user) {
            return false
        } else {
            return true
        }
    }).withMessage('Credenciales invalidas'),
]