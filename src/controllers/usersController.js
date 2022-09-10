const { loadUsers, storeUsers } = require('../data/usersModule');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

module.exports = {
    register: (req, res) => {
        return res.render('users/register', {
            title: 'Register'
        })
    },

    processRegister: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const { firstName, lastName, email, telephone, password } = req.body;
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
    },

    login: (req, res) => {
        return res.render('users/login', {
            title: 'Login'
        })
    },

    processLogin: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {

            let { id, firstName, lastName, category, image, email} = loadUsers().find(user => user.email === req.body.email);

            req.session.userLogin = {
                id,
                firstName,
                lastName,
                category,
                email,
                image
            };

            if (req.body.remember) {
                res.cookie('remember', req.session.userLogin, {
                    maxAge: 1000 * 60
                })
            };

            return res.redirect('/')
        } else {
            return res.render('users/login', {
                title: 'Login',
                errors: errors.mapped()
            })
        }
    },
    
    profile: (req, res) => {
        const user = req.session.userLogin
        return res.render('users/profile', {
            title: 'Perfil de usuario',
            user
        })
    },
    
    update: (req,res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            const {firstName,lastName,email,password,telephone, category, image} = req.body;
            let users = loadUsers();
            
            let newUser = {
                id : users.length > 0 ? users[users.length - 1].id + 1 : 1,
                firstName :firstName.trim(),
                lastName : lastName.trim(),
                email : email.trim(),
                password : bcryptjs.hashSync(password,12),
                telephone : telephone.trim(),
                category : 'admin',
                image : image
            }
            
            let usersModify = [...users, newUser];
            
            storeUsers(usersModify);
            
            return res.redirect('/users/profile');
        }else{
            return res.render('index',{
                title: '',
                errors : errors.mapped(),
                old : req.body
            })
        }
    },
    
    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/');
    },
}


