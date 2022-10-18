'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Location,{
        as:'locations',
        foreignKey:'userId',
        otherKey:'locationId',
        through:'userlocations'
      })
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    userName: DataTypes.STRING,
    musicFav: DataTypes.JSON,
    genre: DataTypes.STRING,
    biography: DataTypes.STRING,
    telephone: DataTypes.INTEGER,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    rol: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};