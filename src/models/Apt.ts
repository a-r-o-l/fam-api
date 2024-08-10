import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const Apt = sequelize.define(
  "Apt",
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
    building_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    it_was_sold: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    tableName: "Apt",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);
