const db = require('../../database/models');
const path = require('path')
const bcryptjs = require('bcryptjs');
const { literal } = require('sequelize');
const { ROL_ADMIN, ROL_USER } = require('../../constants/users');


module.exports = {
    image: (req,res) => {
        res.sendFile(path.join(__dirname,`../../../public/img/users/${req.params.img}`))
    },
    list: async (req, res) => {
        try {
            const users = await db.User.findAll({
                attributes: ['id','firstName','lastName','email',"rol",
                [literal(`CONCAT('${req.protocol}://${req.get('host')}${req.baseUrl}/', id)`),'detail']
            ]
            })
            console.log(users)

            return res.status(200).json({
                meta: {
                    ok: true,
                    status: 200,
                    count: users.length,
                },
                    users
            })
        } catch (error) {
            console.log(error);
			return res.status(error.status || 500).json({
				ok: false,
				msg: error.message ? error.message : 'Comuníquese con el administrador del sitio'
			})
        }
    },

    detail: async (req, res) => {
        try {
            const options = {         
                include: [
                    { association: 'locations',
                    attributes: {
                        exclude: ['street','createdAt','updatedAt','deletedAt']
                    },
                    through: {
                        attributes: []
                      }
                 }
                ],
                 attributes: {
                    exclude: ['telephone','password','createdAt','updatedAt','deletedAt',],
                    include:[[literal(`CONCAT( '${req.protocol}://${req.get('host')}/api/users/image/',avatar )`),'avatar']]
                 }
                    
            }
            const user = await db.User.findByPk(req.params.id, options); //Traigo al usuario cuyo id es igual al guardado en session del usuario logueado.

            if (user) {                                     // Si viene user renderizo la vista de profile.
                res.status(200).json({
                    meta: {
                        ok: true,
                        count: user.length,
                    },
                        data: user
                })
            }
        } catch (error) {
            console.log(error);
			return res.status(error.status || 500).json({
				ok: false,
				msg: error.message ? error.message : 'Comuníquese con el administrador del sitio'
			})
        }

    },
    update: (req,res) => {
    },
    remove: (req,res) => {
    },
}