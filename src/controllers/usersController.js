

const {validationResults} = require('express-validator');
const bcryptjs = require('bcryptjs');

module.exports = {
    register: (req,res) => {
        return res.render('users/register')
    },
    login: (req,res) => {
        return res.render('users/login')
    },
    processLogin: (req,res) => {
        let errors = validationResult(req);

        if(errors.isEmpy()) {
            let {id, name, username} = loadUsers().find(user = user.email === req.body.email)
            
            return res.redirect('/')
        } else {
            return res.render('/login', {
                title : 'login',
                errors : errors.maped()
            })
        }
        return res.send(req.body)

    }
}
