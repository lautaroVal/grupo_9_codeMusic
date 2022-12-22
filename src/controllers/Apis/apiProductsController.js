const db = require('../../database/models');
const { Op, literal } = require('sequelize');
const path = require('path')
const { OFERTA, SINOFERTA } = require('../../constants/products');


module.exports = {
	image: (req, res) => {
		res.sendFile(
			path.join(__dirname, `../../public/img/products/${req.params.img}`)
		)
	},

	list: async (req, res) => {
		try {
			const totalProducts = await db.Product.count();
            const totalUsers = await db.User.count();
            const totalCategories = await db.Category.count();
			/* const {      
				page = 1,
				offset = 0,
				limit = 10,
				sales = 0,
				salesDiscount = 0,
				price = 0,
				order = "ASC",
				sortBy = "name",
				search = "",} = req.query;

			limit = +limit > 10 ? 10 : +limit;
			page = +page <= 0 || isNaN(page) ? 1 : page;
			page -= 1;
			offset = page * limit;
 */
			let products = await db.Product.findAll({
				/* limit, offset, order, page, */
				include: [
					{
						association: 'images',
						attributes: {
							exclude: ['createdAt', 'updatedAt']
						}
					}, {
						association: 'brand',
						attributes: {
							exclude: ['createdAt', 'updatedAt']
						}
					}, {
						association: 'category',
						attributes: {
							exclude: ['createdAt', 'updatedAt']
						}
					}, {
						association: 'color',
						attributes: {
							exclude: ['createdAt', 'updatedAt']
						}
					}
				]
				,
				attributes: {
					exclude: ['categoryId', 'brandId', 'colorId', 'createdAt', 'updatedAt', 'deletedAt']
				}
			})
			if (products.length) {
				return res.status(200).json({
					meta: {
						ok: true,
						count: products.length,
						countByCategory: {
							totalCategories,
							totalUsers,
							totalProducts}
					},
					data: products
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

	detail: async (req, res) => {
		try {
			const product = await db.Product.findByPk(req.params.id, {
				include: [
					{
						association: 'images',
						attributes: {
							exclude: ['createdAt', 'updatedAt']
						}
					}, {
						association: 'brand',
						attributes: {
							exclude: ['createdAt', 'updatedAt']
						}
					}, {
						association: 'category',
						attributes: {
							exclude: ['createdAt', 'updatedAt']
						}
					}, {
						association: 'color',
						attributes: {
							exclude: ['createdAt', 'updatedAt']
						}
					}
				],
				attributes: {
					exclude: ["createdAt", "updatedAt", 'deletedAt', "brandId", "colorId", "categoryId"],
				/* 	include:[[literal(`CONCAT( '${req.protocol}://${req.get('host')}/api/products/image/',image )`),'image']]
				 */},

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
			return res.status(error.status || 500).json({
				ok: false,
				msg: error.message ? error.message : 'Comuníquese con el administrador del sitio'
			})
		}
	},

	store: (req, res) => {

	 },

	update: async (req, res) => {

	},

	destroy: (req, res) => {

	 },

}