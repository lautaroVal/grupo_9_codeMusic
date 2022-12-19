'use strict';

const usersDB = require('../../data/usersDB.json');
const users = usersDB.map(user => {
  return {
    ...user,
    musicFav: JSON.stringify(user.musicFav),
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
