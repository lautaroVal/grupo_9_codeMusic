'use strict';

const imagesDB = require('../data/images.json');
const images = imagesDB.map(image => {
  return {
    ...image,
    createdAt: new Date()
  }
}); 

module.exports = {
  async up (queryInterface, Sequelize) {
    
      //Add seed commands here.
     
      //Example:
      await queryInterface.bulkInsert('Images', images, {});
    
  },

  async down (queryInterface, Sequelize) {
    
      //Add commands to revert seed here.
     
      //Example:
      await queryInterface.bulkDelete('Images', null, {});
     
  }
};
