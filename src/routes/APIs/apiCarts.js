// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {list, addItem, removeItem, removeAllItem} = require('../../controllers/APIs/apiCartsController');

// /api/carts

router
    .get('/', list)
    .post('/', addItem)
    .delete('/all/:id',removeAllItem)
    .delete('/',removeItem)

module.exports = router;
