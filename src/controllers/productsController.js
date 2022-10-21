const db = require('../database/models');
const { Op } = require('sequelize');
const { loadProducts, storeProducts } = require('../data/productsModule');
const { validationResult } = require('express-validator')
const {OFERTA,SINOFERTA} = require('../constants/products')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

module.exports = {

	productsList: async (req, res) => {
		try {
			const products = await db.Product.findAll({
				include: ['images', 'brand', 'category']
			})

			return res.render('products/products', {
				title: "Listado de productos",
				products,
				toThousand
			})
		} catch (error) {
			console.log(error);
		}
	},

	/* DETAIL */
	productDetail: async (req, res) => {
		try {
			const product = await db.Product.findByPk(req.params.id, {
				include: ['images', 'brand', 'category'],
				attributes: {
					exclude: ["created_at", "updated_at"],
				},
			})
			return res.render('products/productDetail', {
				title: "Detalle de producto",
				product,
				toThousand
			})

		} catch (error) {
			console.log(error);
		}

		/* 	const products = loadProducts();
	
			const product = products.find(product => product.id === +req.params.id);
			return res.render('products/productDetail', {
				title: "Detalle de producto",
				product,
				toThousand
			}) */
	},
	/* CART */
	productCart: (req, res) => {
		const products = loadProducts();
		const productId = products.find(product => product.id === +req.params.id);

		res.render('products/productCart', {
			title: "Carrito de compras",
			productId
		})
	},

	/* CREATE */
	productAdd: async (req, res) => {
		try {
			const brands = await db.Brand.findAll({
				attributes: ['id', 'name'],
				order: ['name']
			});
			const colors = await db.Color.findAll({
				attributes: ['id', 'name'],
				order: ['name']
			});
			const categories = await db.Category.findAll({
				attributes: ['id', 'name'],
				order: ['name']
			});

			return res.render('products/productAdd', {
				title: "Crear producto",
				brands,
				colors,
				categories
			})

		} catch (error) {
			console.log(error);
		}
	},

	productAddStore: async (req, res) => {
		try {
			let errors = validationResult(req);
			//Si no hay errores crea el producto y redirecciona a products.
			if (errors.isEmpty()) {
				const { name, price, status, share, discount, description, brandId, colorId, categoryId } = req.body;

				const product = await db.Product.create({
					...req.body,
					name: name.trim(),
					price: +price,
					status: status ? status : 0,
					share: share ? share : 12,
					discount: +discount,
					description: description.trim(),
					brandId: +brandId,
					colorId: +colorId,
					categoryId: +categoryId
				})

				// Si crea el producto traigo los propiedades name y productId de las imágenes y las creo.
				if (product) {
					let images = req.files.map(file => {
						return {
							name: file.filename,
							productId: product.id
						}
					})

					await db.Image.bulkCreate(images)
				}
				//Una vez completa la creación del producto me redirige al listado de productos.
				return res.redirect('/products')

				//Si vienen errores renderizo la vista de creación mostrandolos.
			} else {
				const brands = await db.Brand.findAll({
					attributes: ['id', 'name'],
					order: ['name']
				});
				const colors = await db.Color.findAll({
					attributes: ['id', 'name'],
					order: ['name']
				});
				const categories = await db.Category.findAll({
					attributes: ['id', 'name'],
					order: ['name']
				});

				return res.render('products/productAdd', {
					title: "Crear producto",
					brands,
					colors,
					categories,
					errors: errors.mapped(),
					old: req.body
				})
			}

		} catch (error) {
			console.log(error);
		}
	},

	/* EDIT */
	productEdit: async (req, res) => {

		try {

			const brands = await db.Brand.findAll({
				attributes: ['id', 'name'],
				order: ['name']
			});
			const colors = await db.Color.findAll({
				attributes: ['id', 'name'],
				order: ['name']
			});
			const categories = await db.Category.findAll({
				attributes: ['id', 'name'],
				order: ['name']
			});
			const images = await db.Image.findAll({
				attributes: ['id', 'name'],
				order: ['name']
			});

			const product = await db.Product.findByPk(req.params.id, {
				include: [
					{association: 'brand'},
					{association: 'colors'},
					{association: 'images'},
					{association: 'category',attributes: {
						exclude: ["created_at", "updated_at"],
					}},
				],
				
			});

 			//return res.send(product.images)
 			return res.render('products/productEdit', {
				title: "Edicion del Producto",
				product,
				brands,
				colors,
				categories,
				images,
				OFERTA,
				SINOFERTA
			})
		} catch (error) {
			console.log(error);
		}
	},

	update: async (req, res) => {

/*  		const products = loadProducts();
 */ 		try {
	 const { name,images,price,share,discount,description,brandId,categoryId, colorId, status } = req.body;
	 return res.send(req.body)

			const producstModify = await db.Product.update({
				...product,
				name: name,
				images,
				price: +price,
				share: +share,
				discount: +discount,
				description: description,
				brandId,
				categoryId,
				colorId,
				status
				},
				{
					where: {
						id: req.params.id
					}
				}
			)
			if (product) {
				let images = req.files.map(file => {
					return {
						name: file.filename,
						productId: product.id
					}
				})

				await db.Image.update(images)
			}
			if (producstModify) {
				return res.redirect('/products/productDetail/' + req.params.id);
			}

		} catch (error) {
			console.log(error);
		}

	},

	destroy: async (req, res) => {
		/* 		const products = loadProducts();
		 */
		const { id } = req.params;
		const productDelete = await db.products.destroy(products => products.id !== +id);
		storeProducts(productDelete);
		return res.redirect('/products');
	}
}
