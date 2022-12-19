'use strict';

const brandsDB = require('../../data/brands.json');
const brands = brandsDB.map(brand => {
  return {
    ...brand,
    createdAt: new Date()
  }
}) 



module.exports = {
  async up (queryInterface, Sequelize) {
    
      //Add seed commands here.
     
      //Example:
      await queryInterface.bulkInsert('Brands', brands, {});
    
  },

  async down (queryInterface, Sequelize) {
    
      //Add commands to revert seed here.
     
      //Example:
      await queryInterface.bulkDelete('Brands', null, {});
     
  }
};
