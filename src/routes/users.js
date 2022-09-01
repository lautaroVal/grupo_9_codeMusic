const { application } = require('express');
const express = require('express');
const router = express.Router();

const {register, login, processLogin} = require('../controllers/usersController');
const usersController = require('../controllers/usersController');
const loginValidator = require('../validations/loginValidator');

router
    .get('/register', register)
    .get('/login', login)
    .post('/login', loginValidator, processLogin)

module.exports = router;