'use strict';


const userLocationsDB = require('../../data/userLocations.json');
const userLocations = userLocationsDB.map(userLocation => {
  return {
    ...userLocation,
    createdAt: new Date()
  }
});


// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      // Add seed commands here.
     
      // Example:
      await queryInterface.bulkInsert('userLocations', userLocation, {});
    
  },

  async down (queryInterface, Sequelize) {
   
      // Add commands to revert seed here.
     
      // Example:
      await queryInterface.bulkDelete('userLocations', null, {});
     
  }
};
