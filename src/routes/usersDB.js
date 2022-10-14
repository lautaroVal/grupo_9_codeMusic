const express = require('express');
const router = express.Router();
const UsersDBController = require('../controllers/UsersDBController');

router.get('/register', register)
router.post('/register', processRegister)


module.exports = router;