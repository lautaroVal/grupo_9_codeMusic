const db = require('../database/models');
const { loadUsers, storeUsers } = require('../data/usersModule');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const { Association } = require('sequelize');

module.exports = {
  register: async (req, res) => {
    try {
      return res.render("users/register", {
        title: "Register",
      });
    } catch (error) {
      console.log(error);
    }
  },
  processRegister: async (req, res) => {
    try {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        let { firstName, lastName, email, telephone, password} = req.body;
          const user = await db.User.create({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          username: "",
          musicFav: "[]",
          genre: "",
          biography: "",
          avatar: "default-users-image.jpg",
          rol: 0,
          telephone: +telephone.trim(),
          password: bcryptjs.hashSync(password, 12)
        })
          return ((user) => {
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
          
      } else {
        res.render("users/register", {
          title: "register",
          errors: errors.mapped(),
          old: req.body
        });
      }
    } catch (error) {
      console.log(error);
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
        db.User.findOne({
          where: {
            email: req.body.email
            
          },
        }).then((user) => {
          req.session.userLogin = {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              telephone: user.telephone,
              rol: user.rol,
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
         errors: errors.mapped(),

        });
      }
    },
    
  
    profile: (req, res) => {
      const id = req.session.userLogin?.id;
      db.User.findByPk(id)
        .then((user) => {
          return res.render("users/profile", {
            title: "Mi perfil",
            user,
          });
        })
        .catch((err) => console.log(err));
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

