'use strict';

const usersDB = require('../../data/users.json');
const users = usersDB.map(user => {
  return {
    ...user,
    createdAt: new Date()
  }
});

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    //  Add seed commands here.
     
      // Example:
      await queryInterface.bulkInsert('Users', users, {});
    
  },

  async down (queryInterface, Sequelize) {
    
    //  Add commands to revert seed here.
     
      // Example:
    await queryInterface.bulkDelete('Users', null, {});
    
  }
};
