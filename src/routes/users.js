const express = require('express');
const router = express.Router();
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator')



const {register, login, processRegister, processLogin} = require('../controllers/usersController');


router
    .get('/register', register)
    .post('/register', registerValidator, processRegister)
    .get('/login', login)
    .post('/login', loginValidator, processLogin)
module.exports = router;