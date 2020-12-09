"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "comments",
      [
        {
          content: "What a nice app, we did a great job",
          userId: 1,
          postId: 1,
          requestId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "This is your answer",
          userId: 1,
          postId: null,
          requestId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
