const db = require('../database/models');
const { Op } = require('sequelize');
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");


const limitSeisProductForCategoryOrStatus = (arr, filterName, filterParam = "category") => {
  let arrFilter = arr.filter((product) => product[filterParam] === filterName);
  let newArr = [];
  for (let index = 0; index < arrFilter.length; index++) {
    newArr = [...newArr, arrFilter[index]];
    if (index === 5) {
      break;
    }
  }
  return newArr;
};

module.exports = {
  index: async (req, res) => {

    try {
      const oferta = await db.Product.findAll({
        where: {
          status: 1
        },
        include: ['images', 'brand', 'category']
      });
      const guitarras = await db.Product.findAll({
        where: {
          categoryId: 1
        },
        include: ['images', 'brand', 'category']
      });
      const baterias = await db.Product.findAll({
        where: {
          categoryId: 2
        },
        include: ['images', 'brand', 'category']
      });
      const teclados = await db.Product.findAll({
        where: {
          categoryId: 3
        },
        include: ['images', 'brand', 'category']
      });
      const microfonosYSonido = await db.Product.findAll({
        where: {
          categoryId: 4
        },
        include: ['images', 'brand', 'category']
      });
      const deVientos = await db.Product.findAll({
        where: {
          categoryId: 5
        },
        include: ['images', 'brand', 'category']
      });

      //return res.send(oferta)
      return res.render("index", {
        title: "Code Music",
        oferta,
        guitarras,
        baterias,
        teclados,
        microfonosYSonido,
        deVientos,
        toThousand,
      });

    } catch (error) {
      console.log(error)
    }
  },

  search: async (req, res) => {

    try {
      const { keywords } = req.query;
      const result = await db.Product.findAll({
        where: {
          [Op.or]: [
            {
              name: {[Op.substring]: keywords}
            },
            {
              description: {[Op.substring]: keywords}
            }
          ]
        },
        include: ['images', 'brand', 'category']
      })

      return res.render("products/results", {
        title: "Resultado de búsqueda",
        keywords,
        result
      })
      
    } catch (error) {
      console.log(error);
    }

  }
};



