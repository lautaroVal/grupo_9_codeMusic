'use strict';

const userLocations = [
  {
      "userId" : 1,
      "locationId" : 1,
      createdAt: new Date()
  },
  {
      "userId" : 2,
      "locationId" : 2,
       createdAt: new Date()
  },
  {
      "userId" : 3,
      "locationId" : 3,
       createdAt: new Date()
  },
  {
      "userId" : 4,
      "locationId" : 4,
       createdAt: new Date()
  }
]


// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      // Add seed commands here.
     
      // Example:
      await queryInterface.bulkInsert('userLocations', userLocations, {});
    
  },

  async down (queryInterface, Sequelize) {
   
      // Add commands to revert seed here.
     
      // Example:
      await queryInterface.bulkDelete('userLocations', null, {});
     
  }
};
