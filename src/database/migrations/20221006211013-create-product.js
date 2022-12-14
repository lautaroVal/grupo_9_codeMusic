'use strict';

const { SINOFERTA } = require("../../constants/products");

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
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: SINOFERTA                     // 0 = sinOferta & 1 = oferta
      },
      share: {
        type: Sequelize.INTEGER,
        defaultValue: 12
      },
      discount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      brandId: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        references : {
          model : {
            tableName : 'Brands'
          },
            key : 'id'
        }
      },
      colorId: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        references : {
          model : {
            tableName : 'Colors'
          },
            key : 'id'
        }
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Categories'
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