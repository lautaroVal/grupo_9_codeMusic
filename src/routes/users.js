const { application } = require('express');
const express = require('express');
const router = express.Router();


const {register, login, processLogin, userRegister} = require('../controllers/usersController');
const usersController = require('../controllers/usersController');
const loginValidator = require('../validations/loginValidator');


router
    .get('/register', register)
    .get('/login', login)
    .post('/login', loginValidator, processLogin)
    .get('/userRegister', userRegister)

module.exports = router;