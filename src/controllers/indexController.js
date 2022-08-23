const {loadProducts, storeProducts} = require('../data/productsModule');

module.exports = {
    index: (req, res) => {
		const products = loadProducts();
		const guitarras = products.filter(product => product.category === "guitarras");
        const baterias = products.filter(product => product.category === "baterias");
		const teclados = products.filter(product => product.category === "teclados");
        const microfonosYSonidos = products.filter(product => product.category === "microfonosYSonidos");
        const deVientos = products.filter(product => product.category === "deVientos");
		const oferta = products.filter(product => product.estado === "oferta");
		res.render('index',{
			oferta,
			guitarras,
            baterias,
            teclados,
            microfonosYSonidos,
            deVientos
			
			/* toThousand */
		})},
};
