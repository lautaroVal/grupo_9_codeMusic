const express = require('express');
const router = express.Router();

const { productDetail, productCart, productAdd, productEdit, productsList, productAddStore, update } = require('../controllers/productsController')

router
        /* Listado de productos */
        .get('/', productsList)

        /*Formulario de creación de productos  */
        .get('/productAdd', productAdd)

        /*Detalle de un producto particular*/
        .get('/productDetail/:id/', productDetail)

        /* Acción de creación (a donde se envía el formulario)*/
        .post('/productAdd', productAddStore)

        /* Formulario de edición de productos */
        .get('/productEdit', productEdit)

        /* Acción de edición (a donde se envía el formulario): */
        .put('/productEdit/:id', update)

        /* Acción de borrado */
        .delete('/products/:id')

        /* Carrito de compras */
        .get('/productCart', productCart)


module.exports = router;

