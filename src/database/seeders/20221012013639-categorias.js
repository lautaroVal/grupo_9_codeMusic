'use strict';

const categories = [
  {
    name : 'Guitarras',
    createdAt : new Date()},
  {
    name : 'Baterias',
    createdAt : new Date()},
  {
    name : 'Teclados',
    createdAt : new Date()},
  {
    name : 'Micrófonos y sonidos',
    createdAt : new Date()},
  {
    name : 'Vientos',
    createdAt : new Date()}
]

module.exports = {
  async up (queryInterface, Sequelize) {
    
      //Add seed commands here.
     
      //Example:
      await queryInterface.bulkInsert('Categories', categories, {});
    
  },

  async down (queryInterface, Sequelize) {
    
      //Add commands to revert seed here.
     
      //Example:
      await queryInterface.bulkDelete('Categories', null, {});
     
  }
};
