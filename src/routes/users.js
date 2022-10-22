const express = require('express');
const router = express.Router();
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const profileValidator = require('../validations/profileValidator');
const {uploadImageAvatar} = require('../middlewares/uploadImg');
const adminUserCheck = require('../middlewares/adminUserCheck')
const userSessionCheck = require('../middlewares/userSessionCheck');
const {register, login, processRegister, processLogin, profile, logout, update} = require('../controllers/usersController');


router
    .get('/register', register)
    .post('/register', registerValidator,  processRegister)
    .get('/login', login)
    .post('/login', loginValidator, processLogin)
    .get('/profile', userSessionCheck, profile)
    .put('/profile',uploadImageAvatar.single('avatar'),profileValidator, update)
    .get('/logout', logout)

module.exports = router;