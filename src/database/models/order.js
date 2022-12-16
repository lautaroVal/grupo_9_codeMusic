'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Cart, {
        as: "carts",
        foreignKey: "orderId",
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
      this.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
      this.belongsTo(models.Status, {
        as: "status",
        foreignKey: "statusId",
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
    }
  }
  Order.init({
    date: DataTypes.DATE,
    total: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};