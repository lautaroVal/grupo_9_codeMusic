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
        as: "Carts",
        foreignKey: "cartId",
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
      this.belongsTo(models.User, {
        as: "User",
        foreignKey: "userId",
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
      this.belongsTo(models.Statu, {
        as: "Statu",
        foreignKey: "statuId",
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
    }
  }
  Order.init({
    date: DataTypes.DATE,
    total: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    statuId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};