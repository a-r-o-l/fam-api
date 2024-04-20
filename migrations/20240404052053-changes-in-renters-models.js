"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Renters", "name", {
      type: Sequelize.STRING(100),
      allowNull: true,
    });
    await queryInterface.changeColumn("Renters", "lastname", {
      type: Sequelize.STRING(100),
      allowNull: true,
    });
    await queryInterface.changeColumn("Renters", "dni", {
      type: Sequelize.STRING(100),
      allowNull: true,
    });
    await queryInterface.changeColumn("Renters", "phone", {
      type: Sequelize.STRING(100),
      allowNull: true,
    });
    await queryInterface.changeColumn("Renters", "fee", {
      type: Sequelize.STRING(100),
    });
    await queryInterface.changeColumn("Renters", "apartment", {
      type: Sequelize.STRING(100),
    });
    await queryInterface.changeColumn("Renters", "start_date", {
      type: Sequelize.STRING(100),
      allowNull: true,
    });
    await queryInterface.changeColumn("Renters", "image_url", {
      type: Sequelize.STRING(1000),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Renters", "name", {
      type: Sequelize.STRING(50),
      allowNull: true,
    });
    await queryInterface.changeColumn("Renters", "lastname", {
      type: DataTypes.STRING(50),
      allowNull: true,
    });
    await queryInterface.changeColumn("Renters", "dni", {
      type: DataTypes.STRING(50),
      allowNull: true,
    });
    await queryInterface.changeColumn("Renters", "phone", {
      type: DataTypes.STRING(50),
      allowNull: true,
    });
    await queryInterface.changeColumn("Renters", "fee", {
      type: DataTypes.STRING(50),
    });
    await queryInterface.changeColumn("Renters", "apartment", {
      type: DataTypes.STRING(50),
    });
    await queryInterface.changeColumn("Renters", "start_date", {
      type: DataTypes.STRING(50),
      allowNull: true,
    });
    await queryInterface.changeColumn("Renters", "image_url", {
      type: DataTypes.STRING(50),
      allowNull: true,
    });
  },
};
