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
          return res.render("/login", {
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
      let users = loadUsers();
      const user = users.find(user => user.id === req.session.userLogin.id);
      return res.render('users/profile', {
          title: 'Perfil de usuario',
          user,
        });
      },

      update: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let users = loadUsers();
            const { avatar, firstName, lastName, username, gender, telephone, musicFav, province, location, street, biography } = req.body;
            let image = req.files.map((file) => file.filename);

            const usersModify = users.map(user => {
                if (user.id === +req.session.userLogin.id) {
                    return {
                        ...user,
                        avatar: image.length === 0 ? user.avatar : image[0],
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
}

module.exports = usersController;