const {loadProducts, storeProducts} = require('../data/productsModule');

module.exports = {
    
    productDetail: (req,res) => {

		const products = loadProducts();
		
		const productId = products.find(product => product.id === +req.params.id);
		return res.render('products/productDetail',{
			productId
	})
	},

    productCart: (req,res) => res.render('products/productCart'),


    productAdd: (req, res) => {
		return res.render('products/productAdd')
	},
    productAddStore: (req, res) => {
		const {name, price, discount, description, category, image, decimals, colors, estado} = req.body
		const products = loadProducts();

		const newProduct = {
			id : (products[products.length - 1].id +1),
			name: name,
			description: description,
			price: +price,
			discount: +discount,
			image: 'guitarra_electrica_yamaha_pacifica_012_dark.jpg',
            colors: +colors,
			category: +category ,
            decimals: +decimals,
            estado: +estado
		}
		const productsModify = [...products, newProduct];
		storeProducts(productsModify)
		return res.redirect('/products/products')
	},


    productEdit: (req,res) => {
        const products = loadProducts();
		const product = products.find(product => product.id === +req.params.id);

		res.render('products/productEdit', {
			product
		})
    },


    productsList: (req, res) => {
		const products = loadProducts();
		return res.render('products/products', {
			products,
			/* toThousand */
		})
	}
}


/* (req,res) => res.sendFile(path.resolve(__dirname, 'views', 'productDetail.html')), */
/* (req,res) => res.sendFile(path.resolve(__dirname, 'views', 'productCart.html')) */