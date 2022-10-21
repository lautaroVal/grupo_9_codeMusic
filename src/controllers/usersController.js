const db = require('../database/models');
const { loadUsers, storeUsers } = require('../data/usersModule');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const { Association } = require('sequelize');
const {ROL_ADMIN,ROL_USER} = require('../constants/users')


module.exports = {
    register: (req, res) => {
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

          if (user) {
            let location = await db.Location.create({
              id: user.id,
              province: "",
              location: "",
              street: ""
          })

          
          if (location) {
            await db.userLocation.create({
              locationId: location.id,
              userId: user.id
            })
          }

          req.session.userLogin = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            rol: user.rol,
            avatar: user.avatar
          };

            res.cookie('codeMusic', req.session.userLogin, {
              maxAge: 1000 * 60 * 60
          });
        }
        return res.redirect('/users/login');

        } else {
            return res.render('users/register', {
                title: 'Register',
                errors: errors.mapped(),
                old: req.body
            })
        }

      } catch (error) {console.log(error)}
      },

    login: (req, res) => {
        return res.render('users/login', {
            title: 'Login'
        })
    },

    processLogin: async (req, res) => {
         try {
           let errors = validationResult(req);
           if (errors.isEmpty()) {
               const userLog = await db.User.findOne({
                 where: {
                   email: req.body.email,
                 },
               })

               if (userLog) {
                 req.session.userLogin = {
                   id: userLog.id,
                   firstName: userLog.firstName,
                   lastName: userLog.lastName,
                   email: userLog.email,
                   rol: userLog.rol,
                   avatar: userLog.avatar
                 };
                 if (req.body.remember) {
                     res.cookie('codeMusic', req.session.userLogin, {
                         maxAge: 1000 * 60 * 60
                     })
                 };
                  res.locals.userLog = req.session.userLogin;
              }
   
               return res.redirect('/')
   
           } else {
               return res.render('users/login', {
                   title: 'Login',
                   errors: errors.mapped()
               })
           }
          
         } catch (error) {
          console.log(error);
         }
    },

    profile: async (req, res) => {
      try {
        const id = req.session.userLogin.id; 
        const user = await db.User.findByPk(id,{
          include: [
            {association: 'locations'}]
          
        });
       
        if (user) {
          //return res.json(user)
          return res.render('users/profile', {
              title: 'Perfil de usuario',
              user,
              ROL_ADMIN,
              ROL_USER
          });
        }
      } catch (error) {
        console.log(error);
      }
     
 
    },
    catch (error) {
      console.log(error);
    },

    update: async (req, res) => {
      //return res.send(req.body);
      try {
        /* let errors = validationResult(req);
        if (errors.isEmpty()) { */
        const {firstName, lastName, userName,rol, genre, email, telephone, musicFav, province, location, street, biography } = req.body;
        const userModify = await db.User.update({
         /*  ...user, */
          /* avatar: image.length === 0 ? user.avatar : image[0], */
          avatar: req.file?.filename || req.session.userLogin.avatar ,
          firstName: firstName?.trim(),
          lastName: lastName?.trim(),
          userName: userName?.trim(),
          rol,
          genre,
          email: email?.trim(),
          musicFav,
          province,
          location: location?.trim(),
          street: street?.trim(),
          biography: biography?.trim(),
          telephone: +telephone,
        },{
          where: {
            id: req.session.userLogin.id
          }
        })
        console.log(userModify);
        if (userModify) {
          return res.send(userModify);
        }
      
      } catch (error) {
        console.log(error);
      }
            
            // return res.send(req.file) REQ.FILE  <--
            /* let image = req.files.map((file) => file.filename);
            const obj = {name:'emanuela'} */

          /*   db.User.update({
                avatar: req.file?.filename
            }) */
           
            /* req.session.userLogin = {
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
            return res.redirect('/'); */

       /*  } else {
            let users = loadUsers();
            const user = users.find(user => user.id === req.session.userLogin.id);
            return res.render('users/profile', {
                title: 'Perfil de usuario',
                errors: errors.mapped(),
                old: req.body,
                user
            })
        } */
    },

    logout: (req, res) => {
        req.session.destroy();
        res.cookie('codeMusic', null, { maxAge: -1 });
        return res.redirect('/');
    }
}
