"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("pictures", "postId", {
      type: Sequelize.INTEGER,
      references: {
        model: "posts",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("pictures", "postId", {
      type: Sequelize.INTEGER,
    });
  },
};
