const db = require('../database/models');
const bcryptjs = require('bcryptjs');
const { Association } = require('sequelize');
const { ROL_ADMIN, ROL_USER } = require('../constants/users')



module.exports = {

    list: async (req, res) => {
        try {
            const userList = await db.User.findAll()
            console.log(userList)

            res.status(200).json({
                meta: {
                    ok: true,
                    count: userList.length,
                },
                    data: userList
            })
        } catch (error) {
            console.log(error)
        }
    },

    profile: async (req, res) => {
        try {
            const id = req.session.userLogin.id;
            const user = await db.User.findByPk(id, {         //Traigo al usuario cuyo id es igual al guardado en session del usuario logueado.
                include: [
                    { association: 'locations' }]
                    

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
        }

    }
}