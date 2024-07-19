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
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Subscription",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

Subscription.belongsTo(Account, { foreignKey: "account_id", targetKey: "id" });
Account.hasMany(Subscription, { foreignKey: "account_id", sourceKey: "id" });
