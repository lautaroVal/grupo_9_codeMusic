const {loadUsers, storeUsers} = require('../data/usersModule');
const {validationResult} = require('express-validator');
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

        if(errors.isEmpty()) {
            let {id, firstName, lastName} = loadUsers().find(user => user.email === req.body.email)

            req.session.userLogin ={
                id,
                firstName,
                lastName,
            };
             return res.redirect('/') } else {
            return res.render('/login', {
                title : 'login',
                errors : errors.mapped()
            })
        }
        return res.send(req.body)

    },
    userRegister : (req,res) => {

        let errors = validationResult(req);
        if(errors.isEmpty()){
            const {firstName,lastName,email,password,category,image} = req.body;
            let users = loadUsers();
    
            let newUser = {
                id : users.length > 0 ? users[users.length - 1].id + 1 : 1,
                firstName :firstName,
                lastName : lastName,
                email : email,
                password : password,
                category : category,
                image : null
            }
    
            let usersModify = [...users, newUser];
    
            storeUsers(usersModify);
    
            return res.redirect('/users/login');
        }else{
            return res.render('register',{
                title: 'Register',
                errors : errors.mapped(),
                old : req.body
            })
        }
    }
}
