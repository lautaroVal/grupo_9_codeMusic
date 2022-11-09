const express = require('express');
const userApis = require('../../controllers/APIs/userApis');
const router = express.Router();

router
    .get('/', userApis.list )
    .get('/:id', userApis.profile)
    
module.exports = (router)