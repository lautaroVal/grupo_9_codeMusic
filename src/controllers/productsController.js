const {loadProducts, storeProducts} = require('../data/productsModule');

module.exports = {
    
    productDetail: (req,res) => res.render('products/productDetail'),

    productCart: (req,res) => res.render('products/productCart'),

    productAdd: (req,res) => res.render('products/productAdd'),

    productEdit: (req,res) => res.render('products/productEdit'),

    productsList: (req, res) => {
        const products = loadProducts()

        return res.render('products/products',{
            products
    })
}
}



/* (req,res) => res.sendFile(path.resolve(__dirname, 'views', 'productDetail.html')), */
/* (req,res) => res.sendFile(path.resolve(__dirname, 'views', 'productCart.html')) */