'use strict';

const productsDB = require('../../data/productsDB.json');
const productsWithoutImage = productsDB.map(product => {
  return {
    ...product,
    createdAt: new Date()
  }
});

const imagesDB = require('../../data/images.json');

let products = productsWithoutImage.map((product,ip) => {
   imagesDB.forEach((image,ii) => {
    if(ip === ii){
      product = {
        ...product,
        image : image.name
      }
    }
  }); 
  return product
});


module.exports = {
  async up (queryInterface, Sequelize) {
    
      //Add seed commands here.
     
      //Example:
      await queryInterface.bulkInsert('Products', products, {});
    
  },

  async down (queryInterface, Sequelize) {
    
      //Add commands to revert seed here.
     
      //Example:
      await queryInterface.bulkDelete('Products', null, {});
     
  }
};