'use strict';

const brandsCategoriesDB = require('../../data/brandsCategories.json');
const brandsCategories = brandsCategoriesDB.map(brandCategory => {
  return {
    ...brandCategory,
    createdAt: new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    
      //Add seed commands here.
     
      //Example:
      await queryInterface.bulkInsert('brandsCategories', brandsCategories, {});
    
  },

  async down (queryInterface, Sequelize) {
    
      //Add commands to revert seed here.
     
      //Example:
      await queryInterface.bulkDelete('brandsCategories', null, {});
     
  }
};
