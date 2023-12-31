import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Renter } from "./Renter";

export const Apartment = sequelize.define("Apartment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  number: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  rented: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  date_start: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  date_end: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  isExpired: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  renterId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  buildId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  renting: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
});
