const { loadProducts, storeProducts } = require('../data/productsModule');
const { validationResult } = require('express-validator')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

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
	productAdd: (req, res) => {
		return res.render('products/productAdd', {
			title: "Crear producto"
		})
	},

	productAddStore: (req, res) => {
		let errors = validationResult(req)
		if (errors.isEmpty()) {
			const { name, price, discount, description, category, color, status } = req.body
			const products = loadProducts();
		/* 	let images = req.files.map(file => file.filename); */

			const newProduct = {
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
				cuotas: 12
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
		return res.send(req.body)
		const { name, price, category, description, status, color, discount} = req.body;


		const producstModify = products.map(product => {
			if (product.id === +req.params.id) {
				return {
					...product,
					name: name,
					description: description,
					price: +price,
					category,
					discount: +discount,
					image: product.image,
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

