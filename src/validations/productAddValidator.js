const { body } = require('express-validator');

module.exports = [
    body('name')
    .notEmpty().withMessage("Debe ingresar un nombre.").bail()
    .isLength({min: 7}).withMessage('Debe contener 7 caracteres como mínimo.').bail()
    .isLength({max: 60}).withMessage('Debe contener 60 caracteres como máximo.'),
    /*  body('image')
    .custom((value,{req}) => {
        if(req.file){
            return true
        }else {
            return false
        }
    }).withMessage('Debes agregar imagen del producto'),  */
    body('description')
    .notEmpty().withMessage('Debe ingresar una descripción')
    .isLength({min: 20}).withMessage('Debe contener 20 caracteres como mínimo.').bail()
    .isLength({max: 500}).withMessage('Debe contener 500 caracteres como máximo.'),
    body('price')
    .notEmpty().withMessage("Debe ingresar un precio.").bail(),
    body('categoryId')
    .notEmpty().withMessage('Debe seleccionar una categoría')
    /* body('status'), */
]