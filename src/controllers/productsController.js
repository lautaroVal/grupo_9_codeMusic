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
				attributes: ['id','name'],
				order: ['name']
			});
			const colors = await db.Color.findAll({
				attributes: ['id','name'],
				order: ['name']
			});
			const categories = await db.Category.findAll({
				attributes: ['id','name'],
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
			if (errors.isEmpty()) {
				const { name, price, discount, description, category, color, status } = req.body
				 return res.send(req.files) 
				const products = loadProducts();


				const { id } = await db.Product.create({ ...req.body })


				let images = req.files.map(file => {
					return {
						   name: file.filename,
						   productsId: id
					   }
				})

				await db.Image.bulkCreate(images)

			/* 	const newProduct = {
					id: (products[products.length - 1].id + 1),
					name: name,
					description: description,
					image: req.file ? req.file.filename : null,
					category,
					color,
					price: +price,
					decimals: null,
					discount: +discount,
					status,
					share: 12
				} */

				/* const productsModify = [...products, newProduct];
				storeProducts(productsModify) */
				return res.redirect('/products')
			} else {
				return res.render('products/productAdd', {
					title: "Crear producto",
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
		/* return res.send(req.body) */
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
