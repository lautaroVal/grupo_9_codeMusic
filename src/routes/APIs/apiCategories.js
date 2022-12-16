const express = require('express');
const router = express.Router();
const { list } = require('../../controllers/APIs/apiCategoriesController');

router
    .get('/', list)
    
module.exports = router

