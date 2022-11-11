const express = require('express');
<<<<<<< HEAD:src/routes/usersApis.js
const usersApis = require('../controllers/Apis/usersApis');
=======
const userApis = require('../../controllers/APIs/userApis');
>>>>>>> 3844a270edbae25bb618a80e22ff89ac15cd7e43:src/routes/APIs/usersApis.js
const router = express.Router();

router
    .get('/', usersApis.list )
    .get('/:id', usersApis.profile)
    
module.exports = router