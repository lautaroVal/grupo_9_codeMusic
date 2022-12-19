const express = require('express');
const router = express.Router();

const { productDetail, productCart, productAdd, productEdit, productsList, productAddStore, update, destroy} = require('../controllers/productsController');

const productAddValidator = require('../validations/productAddValidator');
const editValidator = require('../validations/editValidator');
const adminUserCheck = require('../middlewares/adminUserCheck');
const { uploadImageProduct } = require('../middlewares/uploadImg');


router
        /* Listado de productos */
        .get('/', productsList)

        /*Formulario de creación de productos  */
        .get('/productAdd',adminUserCheck, productAdd)
       
        /* Acción de creación (a donde se envía el formulario)*/

        .post('/productAdd',uploadImageProduct.fields([ {name:'image'}, {name:'images'}]), productAddValidator, productAddStore)

        /*Detalle de un producto particular*/
        .get('/productDetail/:id', productDetail)

        /* Formulario de edición de productos */
        .get('/edit/:id',adminUserCheck, productEdit)
        /* Carrito de compras */
        
        .get('/productCart', productCart)

        /* Acción de edición (a donde se envía el formulario): */
        .put('/edit/:id', uploadImageProduct.fields([ {name:'image'}, {name:'images'}]),editValidator, update)

        /* Acción de borrado */
        .delete('/delete/:id', destroy)



module.exports = router;

