'use strict';

const estados = ['pendiente','finalizado','cancelado'];
const statuses = estados.map(status => ({
  name: status,
  createdAt: new Date()
}))

module.exports = {
  async up (queryInterface, Sequelize) {
      //Add seed commands here.
     
      //Example:
      await queryInterface.bulkInsert('Statuses', statuses, {});
  },

  async down (queryInterface, Sequelize) {    
      //Add commands to revert seed here.

     // Example:
      await queryInterface.bulkDelete('Statuses', null, {});
  }
};
