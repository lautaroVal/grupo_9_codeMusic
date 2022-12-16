const {ROL_USER, ROL_ADMIN} = require('../../constants/users')
const db = require('../../database/models');
const { sign } = require('jsonwebtoken');
const {hash, compare} = require('bcryptjs');
const { literal } = require('sequelize');

module.exports = {
  /* REGISTER CONTROLLER */
  register: async (req, res) => {
    const {firstName,lastName,email,password,street,city,province} = req.body;

    try {
     /* Si email y password no existen mando msg de error*/
      if (!email || !password) {
        return res.status(401).json({
          ok: false,
          status: 401
        })
      }
     /* Creo el usuario */
      const {id, rolId} = await db.User.create({
        firstName: firstName?.trim(),
        email: email?.trim(),
        password: await hash(password?.trim(),12),
        street: street?.trim(),
        city: city?.trim(),
        province: province?.trim(),
        lastName: lastName?.trim(),
        avatar: req.file?.filename || "default-users-image.jpg",
        rolId: ROL_USER
      });
     /* Creo la dirección del usuario */
      await db.Location.create({
        street: "",
        province: "",
        city: "",
        active: true,
      })
      /* Creo el token */
      const token =  sign({ id, rolId }, process.env.SECRET_KEY_JWT, {expiresIn:'4h'});
      /* Respuesta de creación del token */
      return res.status(201).json({
        ok:true,
        status:201,
        token
      })

      /* Capturo el error y doy una respuesta */
    } catch (error) {
      res.status(500).json({
        ok: false,
        status: 500,
        msg: "Error en el servidor"
      })
    }
  },

  /* LOGIN CONTROLLER */
  login: async (req, res) => { 

    try {
      const {email,password} = req.body;

      /* Si email y password no existen mando msg de error*/
      if (!email || !password) {
        return res.status(401).json({
          ok: false,
          status: 401,
          msg: "El email y el password son requeridos"
        })
      }
      /* Busco al usuario con el email consultado */
      const {id = null,rolId, password: passwordHash} = await db.User.findOne({where: {email}})
      /* Si no existe el usuario mando msg error */
      if (!id) {
        return res.status(404).json({
          ok: false,
          status: 404,
          msg: "No existe ningún usuario con ese email"
        })
      }
      /* Comparamos la conttraseña enviada con la de la base de datos */
      const isPassValid = await compare(password,passwordHash);
      /* Si es falsa la comparación mandamos msg error */
      if (!isPassValid) {
        return res.status(401).json({
          ok: false,
          status: 401,
          msg: "Credenciales inválidas"
        })
      }

      /* Si el usuario existe le creo un nuevo token */
      const token =  sign({ id, rolId }, process.env.SECRET_KEY_JWT, {expiresIn:'4h'});

      res.status(200).json({
        ok:true,
        status:200,
        token,
        urlData: `${req.protocol}://${req.get('host')}${req.baseUrl}/me/${token}`,
      })

    } catch (error) {
      res.status(500).json({
        ok: false,
        status: 500,
        msg: error.message,
      })
    }

  },

  /* GET USER AUTHENTICATED */
  getUserAuthenticated: async (req, res) => { 
    const options = {
      include:[{                   /* Incluimos relación addresses en la consulta de usuario  */
        association: 'locations',
        attributes: {
          exclude:['deletedAt']   /* Excluimos estos attributo del modelo addresses */
        } 
      }],
      attributes: {               /* Excluimos attributos principales de la consulta */
        exclude:['deletedAt','password'],
        include:[[literal(`CONCAT( '${req.protocol}://${req.get('host')}/api/users/image/',avatar )`),'avatar']]
      }       /* Incluimos la url de la imagen armada con el CONCAT */
    }
    try {
        const {id} = req.userToken /* { id:1, rolId: 2} */
        const data = await db.User.findByPk(id,options);   /* Consultamos al usuario autenticado/logueado */

        res.status(200).json({
          ok:true,
          status:200,
          data
        })
      
    } catch (error) {
      res.status(500).json({
        ok:false,
        status:500,
        msg: error.message || "Error en el servidor"
      })
    }



  }

};
