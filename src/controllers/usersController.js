const db = require('../database/models');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const { Association } = require('sequelize');
const { ROL_ADMIN, ROL_USER } = require('../constants/users')


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
        let { firstName, lastName, email, telephone, password } = req.body;
        const user = await db.User.create({                      // Creo un usuario nuevo con lo que viene por body.
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

        if (user) {                                      // Si crea el usuario también creo el registro en Location con sus campos que vienen por body.
          let location = await db.Location.create({
            id: user.id,
            province: "",
            location: "",
            street: "",
            active: true,
          })

          if (location) {                                 // Y si me crea Location creo registro en la tabla pivot con sus foreignKey.
            await db.userLocation.create({
              locationId: location.id,
              userId: user.id
            })
          }

          req.session.userLogin = {                       //Una vez creado el usuario creo session.
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            rol: user.rol,
            avatar: user.avatar
          };

          res.cookie('codeMusic', req.session.userLogin, {         //Y también creo una cokkie
            maxAge: 1000 * 60 * 60
          });
        };

        return res.redirect('/users/login');

      } else {
        return res.render('users/register', {
          title: 'Register',
          errors: errors.mapped(),
          old: req.body
        })
      }

    } catch (error) { console.log(error) }
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
            email: req.body.email,         // Traigo al usuario cuyo email sea igual al que viene por el body.
          },
        })

        if (userLog) {                     // Si viene el usuario logueado creo la session.
          req.session.userLogin = {
            id: userLog.id,
            firstName: userLog.firstName,
            lastName: userLog.lastName,
            email: userLog.email,
            rol: userLog.rol,
            avatar: userLog.avatar
          };
          if (req.body.remember) {         // Si viene por body el campo de remember (recordarme) creo la cookie.
            res.cookie('codeMusic', req.session.userLogin, {
              maxAge: 1000 * 60 * 60
            })
          };
          res.locals.userLog = req.session.userLogin;
        }
        /* Carrito */

        const order = await db.Order.findOne({
          where: {
            userId: req.session.userLogin.id,
            statusId: 1
          },
          include: [{
            association: 'carts',
            include: [{
              association: 'product',
              attributes: {
                include: ['name','price','image']
              },
            }]
          }]
        })
        if (order) {
          req.session.orderCart = {
            id: order.id,
            userId: order.userId,
            total: order.total,
            products: order.carts
          }

          return res.redirect('/');

        }else {
          db.Order.create({
            userId: req.session.userLogin.id,
            statusId: 1

          }).then(order => {
            req.session.orderCart = {
              id: order.id,
              userId: order.userId,
              total: 0,
              products: []
            }

            return res.redirect('/');
          })
        }

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
      const user = await db.User.findByPk(id, {         //Traigo al usuario cuyo id es igual al guardado en session del usuario logueado.
        include: [
          { association: 'locations' },]
          
        });
/*         return res.json(user)
 */
      if (user) {                                     // Si viene user renderizo la vista de profile.
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
  catch(error) {
    console.log(error);
  },

  update: async (req, res) => {
    try {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        const { firstName, lastName, userName, rol, genre, email, telephone, musicFav, province, location, street, biography } = req.body;

        const userModify = await db.User.update({                        // Edito el usuario que el id es igual al de session con los campos que mando por body.
          avatar: req.file?.filename || req.session.userLogin.avatar,
          firstName: firstName?.trim(),
          lastName: lastName?.trim(),
          userName: userName?.trim(),
          rol,
          genre,
          email: email?.trim(),
          musicFav: musicFav ? typeof musicFav === 'string' ? [musicFav] : musicFav : [],
          biography: biography?.trim(),
          telephone: +telephone,
        }, {
          where: {                                   /* Edito el perfil cuando el id sea el del logueado y la ubicación sea activa */
            id: req.session.userLogin.id,          
      
          }
        })

        if (userModify) {                                  //Si edito el usuario edito también a Location con sus campos que vienen por el body.
          await db.Location.update({
            province,
            location: location?.trim(),
            street: street?.trim(),
          }, {
            where: {
              id: req.session.userLogin.id
            }
          })
        }
        return res.redirect('/');

      } else {
        const id = req.session.userLogin.id;
        const user = await db.User.findByPk(id, {
          include: [
            { association: 'locations' }]
        });

        if (user) {
          return res.render('users/profile', {
            title: 'Perfil de usuario',
            errors: errors.mapped(),
            old: req.body,
            user,
            ROL_ADMIN,
            ROL_USER
          });
        }
      }

    } catch (error) {
      console.log(error);
    }
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
   }; */
  },

  logout: (req, res) => {
    req.session.destroy();                            //Elimino la session para deloguear al usuario
    res.cookie('codeMusic', null, { maxAge: -1 });    // Y mato a la cookie.
    return res.redirect('/');
  }
}
