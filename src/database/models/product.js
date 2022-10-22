'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Image, {
        as: "images",
        foreignKey: "productId",
        onDelete: 'cascade'
      });
      this.belongsTo(models.Brand, {
        as: "brand",
        foreignKey: "brandId"
      });
      this.belongsTo(models.Category, {
        as: "category",
        foreignKey: "categoryId"
      });
      this.belongsTo(models.Color, {
        as: "colors",
        foreignKey: "colorId"
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    status: DataTypes.TINYINT,
    share: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    image : DataTypes.STRING,
    description: DataTypes.TEXT,
    brandId: DataTypes.INTEGER,
    colorId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    paranoid:true
  });
  return Product;
};