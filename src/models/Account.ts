import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const Account = sequelize.define(
  "Account",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "user",
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    google_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    is_new: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "Account",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);
