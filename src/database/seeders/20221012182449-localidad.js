'use strict';

const locationsDB = require('../../data/locations.json');
const locations = locationsDB.map(location => {
  return {
    ...location,
    createdAt: new Date()
  }
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    // Add seed commands here.
    
    // Example:
    await queryInterface.bulkInsert('locations', locations, {});
  },

  async down (queryInterface, Sequelize) {
    
      // Add commands to revert seed here.
    
      // Example:
      await queryInterface.bulkDelete('locations', null, {});
    
  }
};
