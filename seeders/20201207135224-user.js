"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Thomas",
          email: "t@k.com",
          password: "banana",
          isAdmin: true,
          accountBlocked: false,
          picture:
            "https://avatars0.githubusercontent.com/u/68589885?s=400&u=52ac2b6b85f9b6293dc82d4fa1361bd627b39578&v=4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "ariqyandri",
          email: "ariq@aric.com",
          password: "ariq",
          isAdmin: true,
          accountBlocked: false,
          picture: "https://m.media-amazon.com/images/I/41Jo4EUYcqL._AC_.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jannis",
          email: "jannis@jannis.com",
          password: "jannis",
          isAdmin: true,
          accountBlocked: false,
          picture:
            "https://avatars2.githubusercontent.com/u/72070948?s=460&u=8a59102e743aef55e99972e7b68d76b5b4200785&v=4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
