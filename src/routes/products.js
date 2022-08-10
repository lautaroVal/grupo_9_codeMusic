const express = require('express');
const router = express.Router();

const {productDetail, productCart, productAdd, productEdit} = require('../controllers/productsController')

router
    .get('/productDetail', productDetail)
    .get('/productCart', productCart)
    .put('/productAdd', productAdd)
    .put('/productEdit', productEdit)

module.exports = router;