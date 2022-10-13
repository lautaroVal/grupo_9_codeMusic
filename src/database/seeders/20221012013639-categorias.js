'use strict';

const categories = [
  {
    name : 'guitarras',
    createdAt : new Date()},
  {
    name : 'baterias',
    createdAt : new Date()},
  {
    name : 'teclados',
    createdAt : new Date()},
  {
    name : 'microfonosYSonidos',
    createdAt : new Date()},
  {
    name : 'deVientos',
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
