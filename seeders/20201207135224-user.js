"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Thomas",
          email: "thomas@thomas.com",
          password: "thomas",
          isAdmin: true,
          accountBLocked: false,
          picture:
            "https://avatars0.githubusercontent.com/u/68589885?s=400&u=52ac2b6b85f9b6293dc82d4fa1361bd627b39578&v=4",
        },
        {
          name: "ariqyandri",
          email: "ariq@aric.com",
          password: "ariq",
          isAdmin: true,
          accountBLocked: false,
          picture: "https://m.media-amazon.com/images/I/41Jo4EUYcqL._AC_.jpg",
        },
        {
          name: "Jannis",
          email: "jannis@jannis.com",
          password: "jannis",
          isAdmin: true,
          accountBLocked: false,
          picture:
            "https://avatars2.githubusercontent.com/u/72070948?s=460&u=8a59102e743aef55e99972e7b68d76b5b4200785&v=4",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
