const db = require('../database/models');
const { Op } = require('sequelize');
const { loadProducts, storeProducts } = require('../data/productsModule');
const { validationResult } = require('express-validator')

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
				include: ['brand','colors','images','category'],
				attributes: {
					exclude: ["created_at", "updated_at"],
				},
				
			});

/* 			return res.send(product.colors)
 */			return res.render('products/productEdit', {
				title: "Edicion del Producto",
				product,
				brands,
				colors,
				categories,
				images
			})
		} catch (error) {
			console.log(error);

		}

		/* const products = loadProducts();
		const product = products.find(product => product.id === +req.params.id);

		res.render('products/productEdit', {
			title: "Edición de producto",
			product
		}) */
	},

	update: async (req, res) => {

/* 		try {
			const update = await db.Product.update({
				...req.body,
				name: req.body.filename.trim(),
				description: req.body.description.trim(),
			},
			{
				where: {
				  id: req.params.id,
				}
			})
		} catch (error) {
			console.log(error);
		} */


/*  		const products = loadProducts();
 */ 		try {

			const { name, description, category, colorId, price, discount, status } = req.body;

			const producstModify = await db.Product.update({
				...product,
				name: name,
				description: description,
				image: req.file ? req.file.filename : product.image,
				category,
				discount: +discount,
				colorId,
				price: +price,
				status
				},
				{
					where: {
						id: req.body.id
					}
				}
			)
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
