"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.request);
      user.hasMany(models.comment);
      user.belongsToMany(models.post, {
        through: "favourites",
        foreignKey: "userId",
        as: "favourite",
      });
      user.hasMany(models.post, {
        as: "author",
        foreignKey: "userId",
      });
      // define association here
    }
  }
  user.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      picture: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
      accountBlocked: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
