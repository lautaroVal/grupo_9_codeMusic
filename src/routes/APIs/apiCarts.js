const express = require('express');
const router = express.Router();

const { list,addItem, removeAllItem, removeItem } = require('../../controllers/Apis/apiCartsController');

router
    .get('/', list)
    .get('/:id', addItem)
    .delete('/all/:id', removeAllItem)
    .delete(':id', removeItem)
    
module.exports = router

