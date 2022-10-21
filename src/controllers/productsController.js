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
	productDetail: (req, res) => {

		const products = loadProducts();

		const product = products.find(product => product.id === +req.params.id);
		return res.render('products/productDetail', {
			title: "Detalle de producto",
			product,
			toThousand
		})
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
	productEdit: (req, res) => {
		const products = loadProducts();
		const product = products.find(product => product.id === +req.params.id);

		res.render('products/productEdit', {
			title: "Edición de producto",
			product
		})
	},

	update: (req, res) => {
		const products = loadProducts();
		const { name, description, category, color, price, discount, status } = req.body;

		const producstModify = products.map(product => {
			if (product.id === +req.params.id) {
				return {
					...product,
					name: name,
					description: description,
					image: req.file ? req.file.filename : product.image,
					category,
					discount: +discount,
					color,
					price: +price,
					status
				}
			}
			return product
		})
		storeProducts(producstModify);
		return res.redirect('/products/productDetail/' + req.params.id);
	},

	destroy: (req, res) => {
		const products = loadProducts();

		const { id } = req.params;
		const productDelete = products.filter(products => products.id !== +id);
		storeProducts(productDelete);
		return res.redirect('/products');
	}
}
