const { loadProducts, storeProducts } = require('../data/productsModule');
const { validationResult } = require('express-validator')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {

	productsList: (req, res) => {
		const products = loadProducts();
		return res.render('products/products', {
			title: "Listado de productos",
			products,
			/* toThousand */
		})
	},

	/* DETAIL */
	productDetail: (req, res) => {

		const products = loadProducts();

		const productId = products.find(product => product.id === +req.params.id);
		return res.render('products/productDetail', {
			title: "Detalle de producto",
			productId,
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
	productAdd: (req, res) => {
		return res.render('products/productAdd', {
			title: "Crear producto"
		})
	},

	productAddStore: (req, res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()) {
			const { name, price, discount, description, category, imageText, color, status } = req.body
			const products = loadProducts();
		/* 	let images = req.files.map(file => file.filename); */

			const newProduct = {
				id: (products[products.length - 1].id + 1),
				name: name,
				description: description,
				price: +price,
				discount: +discount,
				image: imageText || 'guitarra_electrica_yamaha_pacifica_012_dark.jpg' || images, 
				color,
				category,
				status
			}

			const productsModify = [...products, newProduct];
			storeProducts(productsModify)
			return res.redirect('/products')
		}else{
			return res.render('products/productAdd',{
				title: "Crear producto",
				errors: errors.mapped(),
				old: req.body
			})
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
		const { name, price, category, description, status, color, discount, imageText } = req.body;


		const producstModify = products.map(product => {
			if (product.id === +req.params.id) {
				return {
					...product,
					name: name.trim(),
					description: description.trim(),
					price: +price,
					category,
					discount: +discount,
					image: imageText || product.image || 'guitarra_electrica_yamaha_pacifica_012_dark.jpg',
					color,
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


/* (req,res) => res.sendFile(path.resolve(__dirname, 'views', 'productDetail.html')), */
/* (req,res) => res.sendFile(path.resolve(__dirname, 'views', 'productCart.html')) */

