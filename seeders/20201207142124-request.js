"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "requests",
      [
        {
          title: "Awesome app",
          content: "How to make my app even MORE awesome?",
          userId: 1,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("requests", null, {});
  },
};
