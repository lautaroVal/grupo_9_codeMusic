const { body } = require('express-validator');

module.exports = [

    body('name')
        .notEmpty().withMessage("El nombre es requerido.").bail()
        .isLength({ min: 7 }).withMessage('El nombre debe tener como mínimo 7 caracteres.').bail()
        .isLength({ max: 60 }).withMessage('El nombre no puede superar los 60 caracteres.'),

    body('price')
        .notEmpty().withMessage("Debe ingresar un precio.").bail()
        .isNumeric().withMessage("Debe ingresar un valor númerico"),

   /*  body('discount')
        .isNumeric().withMessage("Debe ingresar un valor númerico"), */

    body('description')
        .notEmpty().withMessage("Debe ingresar un descripción.").bail()
        .isLength({ min: 20 }).withMessage('Debe contener 20 caracteres como mínimo.').bail()
        .isLength({ max: 500 }).withMessage('Debe contener 500 caracteres como máximo.'),

    body('categoryId')
        .notEmpty().withMessage("Debe ingresar una categoría.")


]
