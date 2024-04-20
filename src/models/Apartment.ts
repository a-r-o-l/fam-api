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
    number: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    rented: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    buildingId: {
      type: DataTypes.INTEGER,
    },
    activeContractId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);
