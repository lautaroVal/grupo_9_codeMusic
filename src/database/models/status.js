'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Statu extends Model {
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
    }
  }
  Statu.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Statu',
  });
  return Statu;
};