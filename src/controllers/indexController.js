const {loadProducts, storeProducts} = require('../data/productsModule');

module.exports = {
    index: (req, res) => {
		const products = loadProducts();
		const ofertas = products.filter(product => product.category === "ofertas");
		const guitarras = products.filter(product => product.category === "guitarras");
        const baterias = products.filter(product => product.category === "baterias");
		const teclados = products.filter(product => product.category === "teclados");
        const microfonos = products.filter(product => product.category === "microfonos");
        const deVientos = products.filter(product => product.category === "deVientos");
		res.render('index',{
			ofertas,
			guitarras,
            baterias,
            teclados,
            microfonos,
            deVientos
			/* toThousand */
		})},
};
