const express = require('express');
const { list, detail, image } = require('../../controllers/APIs/apiProductsController');
const router = express.Router();

router
    .get('/', list)
    .get('/:id', detail)
    .get("/img/:img", image)

module.exports = router

