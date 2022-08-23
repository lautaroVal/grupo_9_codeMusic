
const {loadProducts, storeProducts} = require('../data/productsModule');



module.exports = {
    
    productDetail: (req,res) => res.render('products/productDetail'),




    productCart: (req,res) => res.render('products/productCart'),




    productAdd: (req, res) => {
		return res.render('products/productAdd')
	},
    productAddStore: (req, res) => {
		const {name, price, discount, description, category, image, decimals, colors} = req.body
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
            decimals: +decimals
		}
		const productsModify = [...products, newProduct];
		storeProducts(productsModify)
		return res.redirect('/products/products')

	},




    productEdit: (req,res) => res.render('products/productEdit'),




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

