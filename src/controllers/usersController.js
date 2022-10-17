const db = require('../database/models');
const sequelize = db.sequelize;
const Users = db.User;
const { loadUsers, storeUsers } = require('../data/usersModule');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

const usersController = {
    register: (req, res) => {
        return res.render("users/register", {
          title: "Register",
        });
    },

    processRegister: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
          let { firstName, lastName, email, telephone, password, password2 } = req.body;
          db.User.create({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            username: null,
            province: null,
            location: null,
            street: null,
            musicFav: null,
            gender: null,
            biography: null,
            telephone: telephone.trim(),
            password: bcryptjs.hashSync(password, 12),
            password2: bcryptjs.hashSync(password2, 12),
          })
            .then((user) => {
              db.Address.create({
                userId: user.id,
            });

            req.session.userLogin = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
              };

            res.cookie('codeMusic', req.session.userLogin, {
                maxAge: 1000 * 60 * 60
            });

            res.redirect("/"); 
            })
            .catch((err) => console.log(err));
            
        } else {
          res.render("users/register", {
            title: "register",
            errors: errors.mapped(),
            old: req.body
          });
        }
      },


    login: (req, res) => {
        return res.render("users/login", {
          title: "Login",
        });
    },

    processLogin: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
          db.User.findOne({
            where: {
              email: req.body.email,
            },
          }).then((user) => {
            req.session.userLogin = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                telephone: user.telephone,
                category: user.category,
                avatar: user.avatar
            };
            if (req.body.remember) {
                res.cookie('codeMusic', req.session.userLogin, {
                    maxAge: 1000 * 60 * 60
                });
            }
    
            res.redirect("/");
          });
        } else {
          return res.render("users/register", {
            title: "Login",
          });
        }
      },
      logout: (req, res) => {
        req.session.destroy();
        res.cookie('codeMusic', null, { maxAge: -1 });
        return res.redirect('/');
    },


    profile: (req, res) => {
        return res.render("users/profile", {
          title: "Mi Perfil",
          User,
        });
      },
}

module.exports = usersController;