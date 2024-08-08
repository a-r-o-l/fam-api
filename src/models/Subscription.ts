import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Account } from "./Account";

export const Subscription = sequelize.define(
  "Subscription",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    payment_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    payment_type_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    value: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    date_approved: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    start_date: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    end_date: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    ip: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payer: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "Subscription",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);
