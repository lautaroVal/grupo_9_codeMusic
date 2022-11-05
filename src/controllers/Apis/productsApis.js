const db = require('../database/models');
const { Op } = require('sequelize');
const { loadProducts, storeProducts } = require('../data/productsModule');
const { validationResult } = require('express-validator');
const {OFERTA,SINOFERTA} = require('../../constants/products');

module.exports = {

    list: async (req, res) => {
		try {
			const products = await db.Product.findAll({
				include: ['images', 'brand', 'category']
			})
			if (products.length) {
				return res.render('products/products', {
					title: "Listado de productos",
					products,
					toThousand
				})
			}
            res.status(200).json({
                meta: {
                    ok: true,
                    count: products.length,
                },
                    data: products
            })
		} catch (error) {
			console.log(error);
		}
	},
    detail: async (req, res) => {
		try {
			const product = await db.Product.findByPk(req.params.id, {
				include: ['images', 'brand', 'category'],
				attributes: {
					exclude: ["created_at", "updated_at"],
				},
			})
			if (product) {
				res.status(200).json({
                    meta: {
                        ok: true,
                        count: product.length,
                    },
                        data: product
                })
			}

		} catch (error) {
			console.log(error);
		}
	}
}