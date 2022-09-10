const express = require('express');
const router = express.Router();
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator')
const profileValidator = require('../validations/profileValidator')
const uploadImges = require('../middlewares/uploadImg')

const userSessionCheck = require('../middlewares/userSessionCheck')
const {register, login, processRegister, processLogin, profile, logout, update} = require('../controllers/usersController');



router
    .get('/register', register)
    .post('/register', registerValidator, processRegister)
    .get('/login', login)
    .post('/login', loginValidator, processLogin)
    .get('/profile', profileValidator, userSessionCheck, profile)
    .put('/profile',uploadImges.single('avatar'), profileValidator, update)
    .get('/logout', logout)

module.exports = router;