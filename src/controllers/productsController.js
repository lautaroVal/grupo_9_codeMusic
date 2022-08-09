module.exports = {
    productDetail: (req,res) => res.render('products/productDetail'),
    productCart: (req,res) => res.render('products/productCart')
}


/* (req,res) => res.sendFile(path.resolve(__dirname, 'views', 'productDetail.html')), */
/* (req,res) => res.sendFile(path.resolve(__dirname, 'views', 'productCart.html')) */