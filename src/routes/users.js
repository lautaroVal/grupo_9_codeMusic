const express = require('express');
const router = express.Router();
const registerValidator = require('../validations/registerValidator')



const {register, login, processRegister} = require('../controllers/usersController');


router
    .get('/register', register)
    .post('/register', registerValidator, processRegister)
    .get('/login', login)
module.exports = router;