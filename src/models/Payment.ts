import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Contract } from "./Contract";

export const Payment = sequelize.define(
  "Payment",
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
    date: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    payed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    receipt: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    contract_id: {
      type: DataTypes.INTEGER,
    },
    renter_id: {
      type: DataTypes.INTEGER,
    },
    apartment_id: {
      type: DataTypes.INTEGER,
    },
    payment_number: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
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
    tableName: "Payment",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

Payment.belongsTo(Contract, { foreignKey: "contract_id", targetKey: "id" });
Contract.hasMany(Payment, { foreignKey: "contract_id", sourceKey: "id" });
