const express = require('express');
const router = express.Router();
const { list, totals } = require('../../controllers/Apis/apiMainController');

router
    .get('/categories', list)
    .get('/totals', totals)
    
module.exports = router

