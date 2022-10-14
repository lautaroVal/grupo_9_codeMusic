'use strict';

const colorsDB = require('../../data/colors.json');
const colors = colorsDB.map(color => {
  return {
    ...color,
    createdAt: new Date()
  }
}) 


module.exports = {
  async up (queryInterface, Sequelize) {
    
      //Add seed commands here.
     
      //Example:
      await queryInterface.bulkInsert('Colors', colors, {});
    
  },

  async down (queryInterface, Sequelize) {
    
      //Add commands to revert seed here.
     
      //Example:
      await queryInterface.bulkDelete('Colors', null, {});
     
  }
};