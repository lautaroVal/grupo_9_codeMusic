'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: "Users",
        foreignKey: "userId",
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
      this.belongsTo(models.Cart, {
        as: "Carts",
        foreignKey: "cartId",
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
    }
  }
  Orders.init({
    date: DataTypes.DATE,
    total: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};