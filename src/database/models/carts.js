'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Order, {
        as: "Orders",
        foreignKey: "orderId",
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
      this.belongsTo(models.Product, {
        as: "Products",
        foreignKey: "productId",
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
    }
    }
  },
  Carts.init({
    quantity: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Carts',
  });
  return Carts;