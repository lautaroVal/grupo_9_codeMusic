const express = require('express');
const router = express.Router();
const { list, profile, image } = require('../../controllers/Apis/apiUsersController');

router
    .get('/', list )
    .get('/:id', profile)
    .get('/:img', image)
    
module.exports = router