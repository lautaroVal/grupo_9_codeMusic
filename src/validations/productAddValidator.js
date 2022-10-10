const { body } = require('express-validator');

module.exports = [
    body('name')
    .notEmpty().withMessage("Debe ingresar un nombre.").bail()
    .isLength({min: 3}).withMessage('Debe contener 3 caracteres como mínimo.').bail()
    .isLength({max: 80}).withMessage('Debe contener 60 caracteres como máximo.'),
    body('imagen')
    .custom((value,{req}) => {
        if(req.file){
            return true
        }else {
            return false
        }
    }).withMessage('Debes agregar una imagen'),
   /*  body('imageText'), */
    body('description')
    .notEmpty().withMessage('Debe ingresar una descripción'),
    body('price')
    .notEmpty().withMessage("Debe ingresar un precio.").bail(),
    body('category')
    .notEmpty().withMessage('Debe seleccionar una categoría')
    /* body('status'), */
]