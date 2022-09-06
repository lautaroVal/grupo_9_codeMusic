const { loadUsers, storeUsers } = require('../data/usersModule');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

module.exports = {
    register: (req, res) => {
        return res.render('users/register', {
            title: 'Register'
        })
    },

    login: (req, res) => {
        return res.render('users/login', {
            title: 'Login'
        })
    },

    processLogin : (req,res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){

        let {id,firstName,lastName, category, image} = loadUsers().find(user => user.email === req.body.email);

        req.session.userLogin ={
            id,
            firstName,
            lastName,
            category,
            image
        };

/*         if(req.body.remember){
            res.cookie('craftsy16',req.session.userLogin,{
                maxAge : 1000 * 60
            })
        } */
            return res.render('users/profile', {
                title: 'Mi perfil'
            }
            )
        }else {
            return res.render('users/login',{
                title: 'Login',
                errors : errors.mapped(),
                old: req.body
            })
        }
    },

    processRegister: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            const {firstName,lastName,email,telephone,password} = req.body;
            let users = loadUsers();

            let newUser = {
                id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
                firstName: firstName,
                lastName: lastName,
                email: email,
                telephone: +telephone,
                password: bcryptjs.hashSync(password, 12),
                category: "user",
                image: "default-users-image.jpg"
            }

            let usersModify = [...users, newUser];

            storeUsers(usersModify);

            return res.redirect('/users/login');
        } else {
            return res.render('users/register', {
                title: 'Register',
                errors: errors.mapped(),
                old: req.body
            })
        }
    }
}