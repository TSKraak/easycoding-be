"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      post.hasMany(models.comments);
      post.belongsToMany(models.user, {
        through: "favourites",
        foreignKey: "postId",
        as: "favourite",
      });
      post.belongsTo(models.user, {
        as: "author",
        foreignKey: "userId",
      });
      // define association here
    }
  }
  post.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "post",
    }
  );
  return post;
};
