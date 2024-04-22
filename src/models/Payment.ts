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
    contractId: {
      type: DataTypes.INTEGER,
    },
    renterId: {
      type: DataTypes.INTEGER,
    },
    apartmentId: {
      type: DataTypes.INTEGER,
    },
    payment_number: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

Payment.belongsTo(Contract, { foreignKey: "contractId", targetKey: "id" });
Contract.hasMany(Payment, { foreignKey: "contractId", sourceKey: "id" });
