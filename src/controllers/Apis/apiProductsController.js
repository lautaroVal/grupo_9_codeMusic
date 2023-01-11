const db = require('../../database/models');
const { Op, literal } = require('sequelize');
const path = require('path')
const { OFERTA, SINOFERTA } = require('../../constants/products');


module.exports = {
	image: (req, res) => {
		res.sendFile(
			path.join(__dirname, `../../../public/img/products/${req.params.img}`)
		)
	},

	list: async (req, res) => {
		try {
			let { page = 1, limit = 10, offset = 15, order = 'ASC', sortBy = 'name' } = req.query;

			//const typeSort = ['name', 'price', 'discount', 'category', 'brand'];

			limit = +limit > 10 ? 10 : +limit;

			/* sortBy = typeSort.includes(sortBy) ? sortBy : 'name'; */

			page = +page <= 0 || isNaN(page) ? 1 : +page;

			page -= 1;

			offset = page * limit;

			let options = {
				limit,
				offset,
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
					exclude: ['categoryId', 'brandId', 'colorId', 'createdAt', 'updatedAt', 'deletedAt'],
					include: [
						[literal(`CONCAT('${req.protocol}://${req.get('host')}${req.baseUrl}/', id)`),'detail']
					]
				}
			}

			const { count, rows: products } = await db.Product.findAndCountAll(options);		

			if (!products.length) {
				return res.status(204).json({
					ok: true,
					status: 204,
					message: "No hay productos en esta página"
				})
			}

			const existPrev = page > 0 && offset <= count;

			const existNext = Math.floor(count / limit) > (page + 1);    

			let urlPrev = null;
			let urlNext = null;

			if (existPrev) {
				urlPrev = `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page}`
			}

			if (existNext) {
				urlNext = `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page + 2}`
			}

			const {count: countCategory} = await db.Product.findAndCountAll({group: 'categoryId',})

			let countCat = [
				{
					name:"Guitarras",
					count: countCategory[0].count,
				},
				{
					name:"Baterias",
					count: countCategory[1].count,
				},
				{
					name:"Teclados",
					count: countCategory[2].count,
				},
				{
					name:"Sonido",
					count: countCategory[3].count,
				},
				{
					name:"Vientos",
					count: countCategory[4].count,
				}
			] 
				

			return res.status(200).json({
				meta: {
					ok: true,
					status: 200
				},
				data: {
					totalProducts: count,
					countPage: products.length,
					countByCategory: countCat,
					totalPages: Math.floor(count / limit),
					page: page + 1,
					prev: urlPrev,
					next: urlNext,
					products
				}
			})

		} catch (error) {
			console.log(error);
			return res.status(error.status || 500).json({
				ok: false,
				msg: error.message || 'Comuníquese con el administrador del sitio'
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
					include: [
						[literal(`CONCAT( '${req.protocol}://${req.get('host')}/api/products/img/', product.image )`),'image']
					]
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