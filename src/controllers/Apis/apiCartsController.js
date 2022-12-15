const db = require('../../database/models')

module.exports = {
    list: async (req,res) => {
        try {
            
            return res.status(200).json({
                ok:true,
                data: req.session.orderCart
            })

        } catch (error) {
            return res.status(500).json({
                ok:false,
                status:500,
                msg: error.message || 'Comuníquese con el administrador'
            })
        }

    },
    addItem: async (req,res) => {

    },
    removeItem: async (req,res) => {

    },
    removeAllItem: async (req,res) => {
        
    }
}