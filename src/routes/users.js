const express = require('express');
const router = express.Router();
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator')
const profileValidator = require('../validations/profileValidator')

const userSessionCheck = require('../middlewares/userSessionCheck')
const {register, login, processRegister, processLogin, profile, logout} = require('../controllers/usersController');


router
    .get('/register', register)
    .post('/register', registerValidator, processRegister)
    .get('/login', login)
    .post('/login', loginValidator, processLogin)
    .get('/profile', profileValidator, userSessionCheck, profile)
    .post('/profile', profileValidator, userSessionCheck, profile)
    .get('/logout', logout)

module.exports = router;