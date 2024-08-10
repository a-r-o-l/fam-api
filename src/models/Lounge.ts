import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const Lounge = sequelize.define(
  "Lounge",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
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
    reservation_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    it_was_sold: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "Lounge",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);
