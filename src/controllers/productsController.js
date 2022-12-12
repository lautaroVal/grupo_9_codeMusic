const db = require('../database/models');
const { Op } = require('sequelize');
const { loadProducts, storeProducts } = require('../data/productsModule');
const { validationResult } = require('express-validator');
const {OFERTA,SINOFERTA} = require('../constants/products');


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

module.exports = {

	productsList: async (req, res) => {
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
			if (product) {
				return res.render('products/productDetail', {
					title: "Detalle de producto",
					product,
					toThousand
				})
			}

		} catch (error) {
			console.log(error);
		}
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
			if (brands && colors && categories) {
				return res.render('products/productAdd', {
					title: "Crear producto",
					brands,
					colors,
					categories
				})
			}

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
					share: +share ? +share : 12,
					discount: +discount,
					image: req.files.image ? req.files.image[0].filename : 'Img-default.jpg',
					description: description.trim(),
					brandId: +brandId ? +brandId  : null,             
					colorId: +colorId ? +colorId : null,             
					categoryId: +categoryId ? +categoryId : null       
				})
				// Si crea el producto traigo los propiedades name y productId de las imágenes y las creo.
				if (req.files.images) {
					let images = req.files.images.map(file => {
						return {
							file: file.filename,
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

			const product = await db.Product.findByPk(req.params.id, {
				include: [
					{ association: 'brand' },
					{ association: 'color' },
					{ association: 'images' },
					{
						association: 'category', attributes: {
							exclude: ["created_at", "updated_at"],
						}
					},
				],
			});

			if (product) {
				return res.render('products/productEdit', {
					title: "Edición del Producto",
					product,
					brands,
					colors,
					categories,
					OFERTA,
					SINOFERTA,
					old: req.body
				})
			}

		} catch (error) {
			console.log(error);
		}
	},

	update: async (req, res) => {
		try {
			let errors = validationResult(req);
			//return res.send(errors)
			if (errors.isEmpty()){
			const { name, price, share, discount, description, brandId, categoryId, colorId, image, status } = req.body;
			await db.Product.update({
				...req.body,
				name: name,
				image: req.files.image ? req.files.image[0].filename : image,
				price: +price,
				share: +share ? +share : 0,
				discount: +discount,
				description: description,
				brandId : +brandId ? +brandId : null,
				categoryId: +categoryId ? +categoryId : null,
				colorId: +colorId ? +colorId : null,
				status
			},
				{
					where: {
						id: req.params.id
					}
				}
			)
			if (req.files.images) {                               
				let imagesDB = await db.Image.destroy({
					where: {
						productId: req.params.id,
					},
					force: true
				})
				//console.log(imagesDB)
				if (imagesDB >= 0) {
					let images = req.files.images.map(file => {
						return {
							file: file.filename,
							productId: req.params.id
						}
					})
					await db.Image.bulkCreate(images)
				}	

			}
			return res.redirect('/products/productDetail/' + req.params.id);

		}else{
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

			const product = await db.Product.findByPk(req.params.id, {
				include: [
					{ association: 'brand' },
					{ association: 'color' },
					{ association: 'images' },
					{
						association: 'category', attributes: {
							exclude: ["created_at", "updated_at"],
						}
					},
				],
			});
	
			 return res.render('products/productEdit', {
				title: "Edición del Producto",
				product,
				brands,
				colors,
				categories,
				OFERTA,
				SINOFERTA,
				errors: errors.mapped(),
			}) 
		}}catch (error) {
			console.log(error);
		}
	},

	destroy: async (req, res) => {
		try {
			const { id } = req.params;
			const productDelete = await db.Product.destroy({
				where: {
					id: id
				}
			});
			if (productDelete === 1) {
				await db.Image.destroy({
					where: {
						productId: id
					},
					force: true
				})
			}
			return res.redirect('/products')

		} catch (error) {
			console.log(error);
		}	
	}
}
