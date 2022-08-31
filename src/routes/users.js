const { application } = require('express');
const express = require('express');
const router = express.Router();

const {register, login, userRegister} = require('../controllers/usersController');

router
    .get('/register', register)
    .get('/login', login)
    .get('/userRegister', userRegister)

module.exports = router;