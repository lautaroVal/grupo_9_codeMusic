const { body } = require('express-validator');
const bcryptjs = require('bcryptjs');

module.exports = [
    body('firstName')
    .notEmpty().withMessage("Debe ingresar un nombre.").bail(),
    body('lastName')
    .notEmpty().withMessage("Debe ingresar un apellido.").bail(),
   /*  body('userName')
    .notEmpty().withMessage("Debe ingresar un nombre de usuario.").bail(), */
    /* body('genre')
    .notEmpty().withMessage("Debe seleccionar un genero").bail(), */
   /*  body('province')
    .notEmpty().withMessage("Debe seleccionar una provincia").bail(), */
  /*   body('location')
    .notEmpty().withMessage("Debe indicar una localidad").bail(), */
    /* body('street')
    .notEmpty().withMessage("Debe indicar un domicilio").bail() */
]