'use strict';

const productsDB = require('../../data/productsDB.json');
const products = productsDB.map(product => {
  return {
    ...product,
    createdAt: new Date()
  }
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