const express = require('express');
const router = express.Router();

const {register, login} = require('../controllers/usersController');

router
    .get('/register', register)
    .get('/login', login)



module.exports = router;