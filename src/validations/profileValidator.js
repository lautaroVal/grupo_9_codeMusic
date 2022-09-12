const { body } = require('express-validator');
const bcryptjs = require('bcryptjs');
const users = require('../data/usersModule').loadUsers();

module.exports = [
    body('firstName')
    .notEmpty().withMessage("Debe ingresar un nombre.").bail(),
    body('lastName')
    .notEmpty().withMessage("Debe ingresar un apellido.").bail(),
    body('username')
    .notEmpty().withMessage("Debe ingresar un nombre de usuario.").bail(),
    body('genero')
    .notEmpty().withMessage("Debe seleccionar un genero").bail(),
    body('generomusic')
    .notEmpty().withMessage("Debe seleccionar al menos un genero").bail(),
    body('provincia')
    .notEmpty().withMessage("Debe seleccionar una provincia").bail(),
    body('localidad')
    .notEmpty().withMessage("Debe indicar una localidad").bail(),
    body('domicilio')
    .notEmpty().withMessage("Debe indicar un domicilio").bail()
]