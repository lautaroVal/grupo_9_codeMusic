'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.TINYINT
      },
      share: {
        type: Sequelize.INTEGER
      },
      discount: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      brandId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'brands'
          },
            key : 'id'
        }
      },
      colorId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'colors'
          },
            key : 'id'
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'categories'
          },
            key : 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};