"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Contract", "type", {
      type: Sequelize.ENUM("building", "apartment", "house", "lounge"),
      defaultValue: "building",
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Contract", "newField");
  },
};
