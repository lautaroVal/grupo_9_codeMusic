const { body } = require('express-validator');
const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const sequelize = db.sequelize;
const Users = db.User;

module.exports = [
    body('firstName')
    .notEmpty().withMessage("Debe ingresar un nombre.").bail(),
    body('lastName')
    .notEmpty().withMessage("Debe ingresar un apellido.").bail(),
    body('username')
    .notEmpty().withMessage("Debe ingresar un nombre de usuario.").bail(),
    body('gender')
    .notEmpty().withMessage("Debe seleccionar un genero").bail(),
    body('gender')
    .notEmpty().withMessage("Debe seleccionar al menos un genero").bail(),
    body('province')
    .notEmpty().withMessage("Debe seleccionar una provincia").bail(),
    body('location')
    .notEmpty().withMessage("Debe indicar una localidad").bail(),
    body('domicilio')
    .notEmpty().withMessage("Debe indicar un domicilio").bail()
]