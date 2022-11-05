const { Router } = require('express');
const express = require('express');
const usersApis = require('../controllers/Apis/usersApis');
const router = express.Router();

router
    .get('/', usersApis.list )
    .get('/:id', usersApis.profile)
    
module.exports = router