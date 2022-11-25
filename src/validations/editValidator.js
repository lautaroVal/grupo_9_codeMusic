const { body } = require('express-validator');

module.exports = [

    body('name')
        .notEmpty().withMessage("Debe ingresar un nombre.").bail()
        .isLength({ min: 3 }).withMessage('Debe contener 3 caracteres como mínimo.').bail()
        .isLength({ max: 255 }).withMessage('Debe contener 60 caracteres como máximo.'),

    body('price')
        .notEmpty().withMessage("Debe ingresar un precio.").bail(),

    body('description')
        .notEmpty().withMessage("Debe ingresar un descripcion.").bail()
        .isLength({ min: 20 }).withMessage('Debe contener 20 caracteres como mínimo.').bail()
        .isLength({ max: 255 }).withMessage('Debe contener 255 caracteres como máximo.'),

    body('brandId')
        .notEmpty().withMessage("Debe ingresar una marca.").bail(),

    body('colorId')
        .notEmpty().withMessage("Debe ingresar un color.").bail(),

    body('categoryId')
        .notEmpty().withMessage("Debe ingresar una categoría.").bail(),

    body('status')
        .notEmpty().withMessage("Debe ingresar la oferta.").bail()


]