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
    selling_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    floor: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    apartment: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    sold: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    property_id: {
      type: DataTypes.INTEGER,
    },
    contract_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Apartment",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);
