const db = require('../../database/models');
const path = require('path')
const bcryptjs = require('bcryptjs');
const { Association } = require('sequelize');
const { ROL_ADMIN, ROL_USER } = require('../../constants/users');


module.exports = {
    image: (req,res) => {
        res.sendFile(path.join(__dirname,`../../../public/img/users/${req.params.img}`))
    },
    list: async (req, res) => {
        try {
            const users = await db.User.findAll({
                include: [
                    {
                        association: 'locations',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'deletedAt']
                        }
                    }
                ],
                attributes: {
					exclude: ['createdAt', 'updatedAt', 'deletedAt']
				}
            })
            console.log(users)

            return res.status(200).json({
                meta: {
                    ok: true,
                    status: 200,
                    count: users.length,
                },
                    data: users
            })
        } catch (error) {
            console.log(error);
			return res.status(error.status || 500).json({
				ok: false,
				msg: error.message ? error.message : 'Comuníquese con el administrador del sitio'
			})
        }
    },

    profile: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id, {         //Traigo al usuario cuyo id es igual al guardado en session del usuario logueado.
                include: [
                    { association: 'locations',
                    attributes: {
                        exclude: ['createdAt','updatedAt','deletedAt']
                    }
                 }],
                 attributes: {
                    exclude: ['createdAt','updatedAt','deletedAt',]
                 }
                    
            });

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

    }
}