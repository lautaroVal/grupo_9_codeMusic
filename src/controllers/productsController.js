module.exports = {
    productDetail: (req,res) => res.render('productDetail'),
    productCart: (req,res) => res.render('productCart')
}


/* (req,res) => res.sendFile(path.resolve(__dirname, 'views', 'productDetail.html')), */
/* (req,res) => res.sendFile(path.resolve(__dirname, 'views', 'productCart.html')) */