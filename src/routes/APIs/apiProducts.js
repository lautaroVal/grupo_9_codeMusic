const express = require('express');
const { list, detail, all } = require('../../controllers/APIs/apiProductsController');
const router = express.Router();

router
    .get('/', list)
    .get('/:id', detail)

module.exports = router

