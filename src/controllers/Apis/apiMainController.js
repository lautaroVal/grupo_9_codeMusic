const db = require('../../database/models')

module.exports = {
    list: async (req,res) => {
        try {
            let categories = await db.Category.findAll({
                attributes: {
					exclude: ['createdAt', 'updatedAt']
                }
            });

            return res.status(200).json({
                ok:true,
                data: categories
            })
            
        } catch (error) {
            return res.status(error.sattus || 500).json({
                ok: false,
                msg: error.message || 'Comunicate con el administrador'
            })
        }

    },

    totals : async (req,res) => {
        try {
            const totalProducts = await db.Product.count();
            const totalUsers = await db.User.count();
            const totalCategories = await db.Category.count();

            return res.status(200).json({
                ok : true,
                data : {
                    totalProducts,
                    totalUsers,
                    totalCategories
                }
            })

        } catch (error) {
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'Comunicate con el administrador'
            })
        }
    }


}