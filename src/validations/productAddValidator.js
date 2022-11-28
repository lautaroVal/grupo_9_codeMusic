const { body } = require('express-validator');

module.exports = [
    body('name')
    .notEmpty().withMessage("El nombre es requerido.").bail()
    .isLength({min: 7}).withMessage('El nombre debe tener como mínimo 7 caracteres.').bail()
    .isLength({max: 60}).withMessage('El nombre no puede superar los 60 caracteres.'),
     /* body('image')
    .custom((value,{req}) => {
        if(req.file){
            return true
        }else {
            return false
        }
    }).withMessage('Debes agregar imagen del producto'),  */
    body('price')
    .notEmpty().withMessage("El precio es requerido.").bail()
    .isNumeric().withMessage("Debe ingresar un valor númerico"),
    body('discount')
    .isNumeric().withMessage("Debe ingresar un valor númerico"),
    body('description')
    .notEmpty().withMessage('La descripción es requerida.')
    .isLength({min: 20}).withMessage('La descripción debe tener 20 caracteres como mínimo.').bail()
    .isLength({max: 500}).withMessage('La descripción no puede superar 500 caracteres.'),
    body('categoryId')
    .notEmpty().withMessage('Debe seleccionar una categoría.')
]