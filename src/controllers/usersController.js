const db = require('../database/models');
const { loadUsers, storeUsers } = require('../data/usersModule');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const { Association } = require('sequelize');

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
                username: "",
                province: "",
                location: "",
                street: "",
                musicFav: "[]",
                gender: "",
                biography: "",
                telephone: +telephone,
                password: bcryptjs.hashSync(password, 12),
                category: "User",
                avatar: "default-users-image.jpg"
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

    processLogin:async  (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
         /*  const users = await db.User.findAll({
                include:[{
                    association:'locations',
                    attributes:{
                            include:['province','street','location'],
                    },
                    through: {
                        attributes: ['created']
                    }
                }]
            })
        
            return res.json(users) */

            let { id, firstName, lastName, email, telephone, category, avatar } = loadUsers().find(user => user.email === req.body.email);

            req.session.userLogin = {
                id,
                firstName,
                lastName,
                email,
                telephone,
                category,
                avatar
            };

            if (req.body.remember) {
                res.cookie('codeMusic', req.session.userLogin, {
                    maxAge: 1000 * 60 * 60
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
        let users = loadUsers();
        const user = users.find(user => user.id === req.session.userLogin.id);
        return res.render('users/profile', {
            title: 'Perfil de usuario',
            user,
        })
    },

    update: (req, res) => {

        /*  return res.send(req.body); */
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let users = loadUsers();
            const { avatar, firstName, lastName, username, gender, telephone, musicFav, province, location, street, biography } = req.body;
            // return res.send(req.file) REQ.FILE  <--
            let image = req.files.map((file) => file.filename);
            const obj = {name:'emanuela'}

          /*   db.User.update({
                avatar: req.file?.filename
            }) */
            const usersModify = users.map(user => {
                if (user.id === +req.session.userLogin.id) {
                    return {
                        ...user,
                        /* avatar: image.length === 0 ? user.avatar : image[0], */
                        avatar: req.file.filename || user.avatar,
                        firstName: firstName?.trim(),
                        lastName: lastName?.trim(),
                        username: username.trim(),
                        category: user.category,
                        gender,
                        email: user.email,
                        musicFav,
                        province,
                        location: location.trim(),
                        street: street.trim(),
                        biography: biography.trim(),
                        telephone: +telephone,
                    }
                }
                return user;
            })
            /* return res.send(usersModify); */
            req.session.userLogin = {
                id: req.session.userLogin.id,
                firstName: usersModify.firstName,
                lastName: usersModify.lastName,
                telephone,
                avatar
            };
            if (req.body.remember) {
                res.cookie('codeMusic', req.session.userLogin, {
                    maxAge: 1000 * 60 * 60
                })
            };

            storeUsers(usersModify);
            return res.redirect('/');

        } else {
            let users = loadUsers();
            const user = users.find(user => user.id === req.session.userLogin.id);
            return res.render('users/profile', {
                title: 'Perfil de usuario',
                errors: errors.mapped(),
                old: req.body,
                user
            })
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.cookie('codeMusic', null, { maxAge: -1 });
        return res.redirect('/');
    }
}


