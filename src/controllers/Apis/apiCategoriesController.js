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

    }




}