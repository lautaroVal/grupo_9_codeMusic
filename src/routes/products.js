const express = require('express');
const router = express.Router();

const {productDetail, productCart, productAdd, productEdit, productsList} = require('../controllers/productsController')

router
            /*  */
    .get('/productDetail', productDetail)

            /*  */
    .get('/productCart', productCart)

            /*  */
    .get('/productAdd', productAdd)

            /*  */
    .get('/productEdit', productEdit)

            /*  */
    .put('/productAdd', productAdd)

            /*  */
    .put('/productEdit', productEdit)

    .get('/products', productsList)
    
module.exports = router;