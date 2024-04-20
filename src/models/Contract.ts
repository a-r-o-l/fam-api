import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Renter } from "./Renter";
import { Apartment } from "./Apartment";

export const Contract = sequelize.define(
  "Contract",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    months_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    end_date: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    renterId: {
      type: DataTypes.INTEGER,
    },
    apartmentId: {
      type: DataTypes.INTEGER,
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

Contract.belongsTo(Renter, { foreignKey: "renterId", targetKey: "id" });
Contract.belongsTo(Apartment, { foreignKey: "apartmentId", targetKey: "id" });

Renter.hasMany(Contract, { foreignKey: "renterId", sourceKey: "id" });
Apartment.hasMany(Contract, { foreignKey: "apartmentId", sourceKey: "id" });
