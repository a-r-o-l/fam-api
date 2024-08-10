"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Apt", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      floor: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      number: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      rented: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      it_was_sold: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      building_id: {
        type: Sequelize.INTEGER,
      },
      active_contract_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      active_renter_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hidden: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.createTable("House", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      address: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      image_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hidden: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      rented: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      active_contract_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      active_renter_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      it_was_sold: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.createTable("Lounge", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      address: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      image_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hidden: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      reservation_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      it_was_sold: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.createTable("Reservation", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hidden: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      lounge_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      payed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      renter: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Reservation");
    await queryInterface.dropTable("Lounge");
    await queryInterface.dropTable("House");
    await queryInterface.dropTable("Apt");
  },
};
