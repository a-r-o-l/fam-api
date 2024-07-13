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
    renter_id: {
      type: DataTypes.INTEGER,
    },
    apartment_id: {
      type: DataTypes.INTEGER,
    },
    is_expired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    months_upgrade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    upgrade_value: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    upgrade_start_date: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    upgrade_end_date: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
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
    tableName: "Contract",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

Contract.belongsTo(Renter, { foreignKey: "renter_id", targetKey: "id" });
Contract.belongsTo(Apartment, { foreignKey: "apartment_id", targetKey: "id" });

Renter.hasMany(Contract, { foreignKey: "renter_id", sourceKey: "id" });
Apartment.hasMany(Contract, { foreignKey: "apartment_id", sourceKey: "id" });
