import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const Upgrade = sequelize.define(
  "Upgrade",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contractId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Contracts",
        key: "id",
      },
    },
    startDate: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    endDate: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    newValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isExpired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);
