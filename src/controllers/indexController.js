const { loadProducts, storeProducts } = require('../data/productsModule');

const limitSeis = (arr) => {
	let newArr = []
	for (let index = 0; index < arr.length; index++) {
		newArr = [...newArr, arr[index]]
		if (index === 5) {
			break;
		}
	}
	return newArr;
}

module.exports = {
	index: (req, res) => {
		const products = loadProducts();
		const guitarras = limitSeis(products.filter(product => product.category === "guitarras"));
		const baterias = limitSeis(products.filter(product => product.category === "baterias"));
		const teclados = limitSeis(products.filter(product => product.category === "teclados"));
		const microfonosYSonidos = limitSeis(products.filter(product => product.category === "microfonosYSonidos"));
		const deVientos = limitSeis(products.filter(product => product.category === "deVientos"));
		const oferta = limitSeis(products.filter(product => product.status === "oferta"));
		res.render('index', {
			oferta,
			guitarras,
			baterias,
			teclados,
			microfonosYSonidos,
			deVientos

			/* toThousand */
		})
	},
};
