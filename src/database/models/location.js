'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User,{
        as:'users',
        foreignKey:'locationId',
        otherKey:'userID',
        through:'userlocations',
        onDelete: 'cascade'
      })
    }
  }
  Location.init({
    province: DataTypes.STRING,
    location: DataTypes.STRING,
    street: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Location',
    paranoid:true
  });
  return Location;
};