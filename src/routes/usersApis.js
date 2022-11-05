const express = require('express');
const userApis = require('../controllers/Apis/userApis');
const router = express.Router();

router
    .get('/', userApis.list )
    .get('/:id', userApis.profile)
    
module.exports = (router)