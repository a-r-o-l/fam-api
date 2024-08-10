import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const House = sequelize.define(
  "House",
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
    rented: {
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
    it_was_sold: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "House",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);
