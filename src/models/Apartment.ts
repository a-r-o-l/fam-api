import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const Apartment = sequelize.define(
  "Apartment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    floor: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    number: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    rented: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    it_was_sold: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    building_id: {
      type: DataTypes.INTEGER,
    },
    active_contract_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    active_renter_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
  },
  {
    tableName: "Apartment",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);
