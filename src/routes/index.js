const express = require('express');
const router = express.Router();

const {index} = require('../controllers/indexController')

router
    /*Listado de productos */

    .get('/', index)
    
module.exports = router;

