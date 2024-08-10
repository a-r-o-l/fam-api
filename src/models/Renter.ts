import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { cleanExpiredContracts } from "../controllers/cron/cron.controller";

export const Renter = sequelize.define(
  "Renter",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    dni: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    active_contract_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    active_apartment_id: {
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
    tableName: "Renter",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);
