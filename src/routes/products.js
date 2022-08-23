const express = require('express');
const router = express.Router();

const {productDetail, productCart, productAdd, productEdit, productsList} = require('../controllers/productsController')

router
            /*Detalle de un producto particular*/
    .get('/productDetail', productDetail)
    .get('/productDetail/:id', productDetail)

            /*  */
    .get('/productCart', productCart)

            /*Formulario de creación de productos  */
    .get('/productAdd', productAdd)
    .post('/productAdd', productAdd)

            /*  */
    .get('/productEdit', productEdit)

            /*  */
    .put('/productAdd', productAdd)

            /*  */
    .put('/productEdit', productEdit)

    .get('/products', productsList)
    
module.exports = router;

/* 1. /


3. /products/:id (GET)

4. /products (POST)
Acción de creación (a donde se envía el formulario)
5. /products/:id/edit (GET)
Formulario de edición de productos
6. /products/:id (PUT)
Acción de edición (a donde se envía el formulario):
7. /products/:id (DELETE) */