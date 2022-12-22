const express = require('express');
const { list, detail, image } = require('../../controllers/APIs/apiProductsController');
const router = express.Router();

router
    .get('/', list)
    .get('/:id', detail)
    .get("/image/:img", image)

module.exports = router

