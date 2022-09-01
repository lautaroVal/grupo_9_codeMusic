const express = require('express');
const router = express.Router();



const {register, login, processLogin, userRegister, processRegister} = require('../controllers/usersController');
/* const loginValidator = require('../validations/loginValidator'); */
const registerValidator = require('../validations/registerValidator')


router
    .get('/register', register)
    .post('/register', registerValidator, processRegister)
    .get('/login', login)
    /* .post('/login', loginValidator, processLogin) */
    /* .get('/userRegister', userRegister) */

module.exports = router;