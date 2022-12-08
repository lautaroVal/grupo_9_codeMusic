const express = require('express');
const { totals } = require('../../controllers/APIs/apiMainController');
const router = express.Router();

router
    .get('/totals', totals)
    
module.exports = router

