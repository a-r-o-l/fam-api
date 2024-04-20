"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Payments", "amount", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.removeColumn("Payments", "fee");
  },

  async down(queryInterface, Sequelize) {},
};
