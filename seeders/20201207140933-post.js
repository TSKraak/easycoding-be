"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "posts",
      [
        {
          title: "Cloudinary",
          content:
            "You should follow 3 steps: 1) Copy-Paste <script src='https://widget.cloudinary.com/v2.0/global/all.js' type='text/javascript'></script> in public/index.js above title, 2) ...",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("posts", null, {});
  },
};
