import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const RefreshToken = sequelize.define(
  "RefreshToken",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiry_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "RefreshToken",
    createdAt: true,
    updatedAt: true,
  }
);
