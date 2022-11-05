const express = require('express');
const { list, detail } = require('../controllers/Apis/productsApis');
const router = express.Router();

router
    .get('/', list)
    .get('/:id', detail)
module.exports = router